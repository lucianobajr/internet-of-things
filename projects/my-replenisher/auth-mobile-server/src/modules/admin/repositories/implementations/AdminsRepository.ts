import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IAdminsRepository } from "../IAdminsRepository";

import prisma from "../../../../shared/infra/prisma";
import { Admin } from "@prisma/client";

class AdminsRepository implements IAdminsRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    await prisma.admin.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return admin;
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    return admin;
  }
}

export { AdminsRepository };
