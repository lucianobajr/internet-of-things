import { Admin } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IAdminsRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<Admin | null>;
  findById(id: string): Promise<Admin | null>;
}

export { IAdminsRepository };
