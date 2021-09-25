import { inject, injectable } from "tsyringe";

import { Category } from "@modules/users/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoryRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
