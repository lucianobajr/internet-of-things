import prisma from "../../../shared/infra/prisma";
import dayjs from "dayjs";

class GenerateRefreshToken {
  async execute(adminId: string) {
    const expires_in = dayjs().add(1, "day").unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        adminId,
        expires_in,
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
