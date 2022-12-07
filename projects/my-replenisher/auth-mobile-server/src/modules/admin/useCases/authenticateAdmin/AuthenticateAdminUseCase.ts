import { compare } from "bcrypt";

import { inject, injectable } from "tsyringe";

import { IAdminsRepository } from "../../repositories/IAdminsRepository";

import { AppError } from "../../../../shared/errors/AppError";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import { RefreshToken } from "@prisma/client";
import prisma from "../../../../shared/infra/prisma";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refreshToken: RefreshToken;
}

@injectable()
class AuthenticateAdminUseCase {
  constructor(
    @inject("AdminsRepository") private adminsRepository: IAdminsRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const admin = await this.adminsRepository.findByEmail(email);

    if (!admin) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, admin.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    //token
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(admin.id);

    await prisma.refreshToken.deleteMany({
      where: {
        adminId: admin.id,
      },
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(admin.id);

    const tokenReturn: IResponse = {
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
      token,
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateAdminUseCase };
