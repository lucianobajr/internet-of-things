import { Router } from "express";
import { AuthenticateAdminController } from "../../../../modules/admin/useCases/authenticateAdmin/AuthenticateAdminController";

const authenticateRoutes = Router();

const authenticateAdminController = new AuthenticateAdminController();

authenticateRoutes.post("/sessions", authenticateAdminController.handle);

export { authenticateRoutes };