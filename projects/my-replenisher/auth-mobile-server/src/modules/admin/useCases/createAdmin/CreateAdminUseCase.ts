import { hash } from "bcrypt";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateAdminUseCase {
  constructor(
    @inject("AdminsRepository") private adminsRepository: IAdminsRepository
  ) {}

  async execute(
    { name, email, password }: ICreateUserDTO
  ): Promise<void> {
    const adminAlreadyExists = await this.adminsRepository.findByEmail(email);

    if (adminAlreadyExists) {
      throw new AppError("User already exits!");
    }

    const passwordHash = await hash(password, 8);

    await this.adminsRepository.create({ name, email, password: passwordHash });
  }
}

export { CreateAdminUseCase };
