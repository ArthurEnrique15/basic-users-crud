import { v4 as uuidV4 } from "uuid";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/categories/dtos/IUpdateCategoryDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category();

        Object.assign(category, { id: uuidV4(), name, description });

        this.categories.push(category);

        return category;
    }

    async update({
        id,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<Category> {
        const categoryIndex = this.categories.findIndex(
            (category) => category.id === id
        );

        if (name) this.categories[categoryIndex].name = name;

        if (description)
            this.categories[categoryIndex].description = description;

        this.categories[categoryIndex].updated_at = new Date();

        return this.categories[categoryIndex];
    }

    softRemove(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    recover(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category> {
        return this.categories.find((category) => category.name === name);
    }

    async findById(id: string): Promise<Category> {
        return this.categories.find((category) => category.id === id);
    }

    findDeletedById(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    findByNameDisregardId(id: string, name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}

export { CategoryRepositoryInMemory };
