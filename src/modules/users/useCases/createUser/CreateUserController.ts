import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, cep, numero, category_id } = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        const createdUser = await createUserUseCase.execute({
            name,
            cep,
            numero,
            category_id,
        });

        return response.status(201).json(createdUser);
    }
}

export { CreateUserController };
