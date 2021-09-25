import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    description: string;
}

@injectable()
class UpdateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({ id, name, description }: IRequest): Promise<Category> {
        const categoryExists = await this.categoryRepository.findById(id);

        if (!categoryExists) throw new AppError("Category doesn't exists!");

        if (!name && !description)
            throw new AppError("There's no information to update!");

        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );

        if (categoryAlreadyExists)
            throw new AppError("Category already exists!");

        const updatedCategory = await this.categoryRepository.update({
            id,
            name,
            description,
        });

        return updatedCategory;
    }
}

export { UpdateCategoryUseCase };
