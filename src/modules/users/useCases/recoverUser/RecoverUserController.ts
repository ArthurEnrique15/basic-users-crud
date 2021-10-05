import { Response, Request } from "express";
import { container } from "tsyringe";

import { RecoverUserUseCase } from "./RecoverUserUseCase";

class RecoverUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const restoreUserUseCase = container.resolve(RecoverUserUseCase);

        const recoveredUser = await restoreUserUseCase.execute(id);

        return response.json(recoveredUser);
    }
}

export { RecoverUserController };
