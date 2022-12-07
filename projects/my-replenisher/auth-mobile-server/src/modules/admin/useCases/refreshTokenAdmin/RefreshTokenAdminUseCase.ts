import prisma from "../../../../shared/infra/prisma";
import { injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
import dayjs from "dayjs";
import { GenerateRefreshToken } from "../../providers/GenerateRefreshToken";

@injectable()
class RefreshTokenAdminUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new AppError("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expires_in)
    );

    //token
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.adminId);

    if (refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          adminId: refreshToken.adminId,
        },
      });

      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.adminId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}

export { RefreshTokenAdminUseCase };
