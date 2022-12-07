import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

class CreateAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdminUseCase = container.resolve(CreateAdminUseCase);

    await createAdminUseCase.execute({
      name,
      email,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateAdminController };
