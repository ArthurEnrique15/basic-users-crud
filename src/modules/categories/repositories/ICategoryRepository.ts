import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../dtos/IUpdateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<Category>;
    update({ id, name, description }: IUpdateCategoryDTO): Promise<Category>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<void>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
    findById(id: string): Promise<Category>;
    findDeletedById(id: string): Promise<Category>;
    findByNameDisregardId(id: string, name: string): Promise<Category>;
}

export { ICategoryRepository };
