import { v4 as uuidV4 } from "uuid";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/categories/dtos/IUpdateCategoryDTO";
import { Category } from "@modules/categories/infra/typeorm/entities/Category";

import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, { id: uuidV4(), name, description });

        this.categories.push(category);
    }

    update({ id, name, description }: IUpdateCategoryDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

    softDelete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    restore(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }

    findById(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    findDeletedById(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }

    findByNameDisregardId(id: string, name: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}

export { CategoryRepositoryInMemory };
