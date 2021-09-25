import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

        const deletedCategory = await deleteCategoryUseCase.execute(id);

        return response.json(deletedCategory);
    }
}

export { DeleteCategoryController };
