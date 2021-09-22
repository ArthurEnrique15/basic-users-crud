import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

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

    async execute({ description, name }: IRequest): Promise<void> {
        // const categoryAlreadyExists =
        //     await this.categoriesRepository.findByName(name);

        // if (categoryAlreadyExists)
        //     throw new AppError("Category already exists!");

        this.categoryRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
