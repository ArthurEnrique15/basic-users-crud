import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(id: string): Promise<void> {
        const category = await this.categoryRepository.findById(id);

        if (!category) throw new AppError("Category doesn't exists!");

        await this.categoryRepository.softDelete(id);
    }
}

export { DeleteCategoryUseCase };
