import { Response, Request } from "express";
import { container } from "tsyringe";

import { RecoverCategoryUseCase } from "./RecoverCategoryUseCase";

class RecoverCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const recoverCategoryUseCase = container.resolve(
            RecoverCategoryUseCase
        );

        const recoveredCategory = await recoverCategoryUseCase.execute(id);

        return response.json(recoveredCategory);
    }
}

export { RecoverCategoryController };
