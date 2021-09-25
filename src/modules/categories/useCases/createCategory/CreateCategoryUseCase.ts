import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
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

    async execute({ name, description }: IRequest): Promise<IResponse> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );

        if (categoryAlreadyExists)
            throw new AppError("Category already exists!");

        const { id, created_at, updated_at, deleted_at } =
            await this.categoryRepository.create({
                name,
                description,
            });

        const responseCategory: IResponse = {
            id,
            name,
            description,
            created_at,
            updated_at,
            deleted_at,
        };

        return responseCategory;
    }
}

export { CreateCategoryUseCase };
