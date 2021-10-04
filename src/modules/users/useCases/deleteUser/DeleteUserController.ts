import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteUserUseCase = container.resolve(DeleteUserUseCase);

        const deletedUser = await deleteUserUseCase.execute(id);

        return response.json(deletedUser);
    }
}

export { DeleteUserController };
