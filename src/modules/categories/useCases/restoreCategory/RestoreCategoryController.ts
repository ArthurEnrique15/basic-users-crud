import { Response, Request } from "express";
import { container } from "tsyringe";

import { RestoreCategoryUseCase } from "./RestoreCategoryUseCase";

class RestoreCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const restoreCategoryUseCase = container.resolve(
            RestoreCategoryUseCase
        );

        const restoredCategory = await restoreCategoryUseCase.execute(id);

        return response.json(restoredCategory);
    }
}

export { RestoreCategoryController };
