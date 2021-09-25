import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/users/dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";

import { Category } from "../entities/Category";

class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({ name, description });

        const createdCategory = await this.repository.save(category);

        return createdCategory;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }

    async findById(id: string): Promise<Category> {
        const category = await this.repository.findOne({ id });
        return category;
    }

    async findDeletedById(id: string): Promise<Category> {
        const deletedCategory = await this.repository
            .createQueryBuilder("deletedCategory")
            .where("id = :id", { id })
            .andWhere("deleted_at IS NOT NULL")
            .withDeleted()
            .getOne();

        return deletedCategory;
    }

    async softDelete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    async restore(id: string): Promise<Category> {
        await this.repository.restore(id);
        return this.findById(id);
    }
}

export { CategoryRepository };
