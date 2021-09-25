import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, description } = request.body;

        const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

        const updatedCategory = await updateCategoryUseCase.execute({
            id,
            name,
            description,
        });

        return response.status(201).json(updatedCategory);
    }
}

export { UpdateCategoryController };
