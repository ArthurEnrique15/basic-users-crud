import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, numero, cep, category_id } = request.body;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const updatedUser = await updateUserUseCase.execute({
            id,
            name,
            numero,
            cep,
            category_id,
        });

        return response.json(updatedUser);
    }
}

export { UpdateUserController };
