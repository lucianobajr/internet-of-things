import { Router } from "express";

import { CreateAdminController } from "../../../../modules/admin/useCases/createAdmin/CreateAdminController";
import { RefreshTokenAdminController } from "../../../../modules/admin/useCases/refreshTokenAdmin/RefreshTokenAdminController";

const adminsRoutes = Router();

const createAdminController = new CreateAdminController();
const refreshTokenAdminController = new RefreshTokenAdminController();

adminsRoutes.post("/", createAdminController.handle);
adminsRoutes.post("/refresh-token", refreshTokenAdminController.handle);

export { adminsRoutes };