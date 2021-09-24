import { v4 as uuidV4 } from "uuid";

import { ICreateCategoryDTO } from "@modules/users/dtos/ICreateCategoryDTO";
import { Category } from "@modules/users/infra/typeorm/entities/Category";

import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, { id: uuidV4(), name, description });

        this.categories.push(category);

        return category;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }

    async list(): Promise<Category[]> {
        const listCategory = this.categories;
        return listCategory;
    }
}

export { CategoryRepositoryInMemory };
