import { inject, injectable } from "tsyringe";

import { Category } from "@modules/users/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RestoreCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(id: string): Promise<Category> {
        const deletedCategory = await this.categoryRepository.findDeletedById(
            id
        );

        if (!deletedCategory) throw new AppError("Category wasn't deleted!");

        const restoredCategory = await this.categoryRepository.restore(id);

        return restoredCategory;
    }
}

export { RestoreCategoryUseCase };
