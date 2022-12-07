import { Router } from "express";
import { adminsRoutes } from "./admins.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();

router.get("/", (request, response) => {
  return response.json({ ok: "api is running! 🔥" });
});

router.use("/admins", adminsRoutes);
router.use("/auth", authenticateRoutes);

export { router };
