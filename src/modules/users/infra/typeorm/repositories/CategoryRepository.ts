import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/users/dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";

import { Category } from "../entities/Category";

class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({ description, name });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoryRepository };
