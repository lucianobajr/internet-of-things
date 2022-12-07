import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenAdminUseCase } from "./RefreshTokenAdminUseCase";

class RefreshTokenAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenAdminUseCase = container.resolve(
      RefreshTokenAdminUseCase
    );

    try {
      const token = await refreshTokenAdminUseCase.execute(refresh_token);

      return response.json(token);
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export { RefreshTokenAdminController };
