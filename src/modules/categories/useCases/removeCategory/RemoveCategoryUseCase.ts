import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RemoveCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(id: string): Promise<Category> {
        const category = await this.categoryRepository.findById(id);

        if (!category) throw new AppError("Category doesn't exists!");

        const removedCategory = await this.categoryRepository.softRemove(
            category
        );

        return removedCategory;
    }
}

export { RemoveCategoryUseCase };
