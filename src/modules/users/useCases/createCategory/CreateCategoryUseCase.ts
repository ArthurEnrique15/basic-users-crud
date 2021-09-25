import { inject, injectable } from "tsyringe";

import { Category } from "@modules/users/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

interface IResponse {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<Category> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );

        if (categoryAlreadyExists)
            throw new AppError("Category already exists!");

        const createdCategory = await this.categoryRepository.create({
            name,
            description,
        });

        const responseCategory: IResponse = {
            id: createdCategory.id,
            name: createdCategory.name,
            description: createdCategory.description,
            created_at: createdCategory.created_at,
            updated_at: createdCategory.updated_at,
            deleted_at: createdCategory.deleted_at,
        };

        return responseCategory;
    }
}

export { CreateCategoryUseCase };
