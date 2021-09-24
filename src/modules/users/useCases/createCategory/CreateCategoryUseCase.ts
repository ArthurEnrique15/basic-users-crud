import { inject, injectable } from "tsyringe";

import { Category } from "@modules/users/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<Category> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );

        if (categoryAlreadyExists)
            throw new AppError("Category already exists!");

        const createdCategory = this.categoryRepository.create({
            name,
            description,
        });

        return createdCategory;
    }
}

export { CreateCategoryUseCase };
