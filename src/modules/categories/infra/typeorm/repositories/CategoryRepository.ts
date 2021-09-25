import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "@modules/categories/dtos/IUpdateCategoryDTO";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";

import { Category } from "../entities/Category";

class CategoryRepository implements ICategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({ name, description });
        await this.repository.save(category);
        return category;
    }

    async update({
        id,
        name,
        description,
    }: IUpdateCategoryDTO): Promise<Category> {
        const updatedCategory = await this.repository.save({
            id,
            name,
            description,
        });

        return updatedCategory;
    }

    async softDelete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    async restore(id: string): Promise<void> {
        await this.repository.restore(id);
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
            .createQueryBuilder()
            .where("id = :id", { id })
            .andWhere("deleted_at IS NOT NULL")
            .withDeleted()
            .getOne();

        return deletedCategory;
    }

    async findByNameDisregardId(id: string, name: string): Promise<Category> {
        const category = await this.repository
            .createQueryBuilder()
            .where("name = :name", { name })
            .andWhere("id != :id", { id })
            .getOne();

        return category;
    }
}

export { CategoryRepository };
