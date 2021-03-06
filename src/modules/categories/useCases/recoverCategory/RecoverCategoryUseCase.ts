import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RecoverCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(id: string): Promise<Category> {
        const deletedCategory = await this.categoryRepository.findDeletedById(
            id
        );

        if (!deletedCategory) throw new AppError("Category wasn't deleted!");

        const recoveredCategory = await this.categoryRepository.recover(
            deletedCategory
        );

        return recoveredCategory;
    }
}

export { RecoverCategoryUseCase };
