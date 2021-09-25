import { Response, Request } from "express";
import { container } from "tsyringe";

import { RemoveCategoryUseCase } from "./RemoveCategoryUseCase";

class RemoveCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeCategoryUseCase = container.resolve(RemoveCategoryUseCase);

        const removedCategory = await removeCategoryUseCase.execute(id);

        return response.json(removedCategory);
    }
}

export { RemoveCategoryController };
