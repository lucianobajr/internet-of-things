import { container } from "tsyringe";

import { IAdminsRepository } from "../../modules/admin/repositories/IAdminsRepository";
import { AdminsRepository } from "../../modules/admin/repositories/implementations/AdminsRepository";

container.registerSingleton<IAdminsRepository>(
  "AdminsRepository",
  AdminsRepository
);