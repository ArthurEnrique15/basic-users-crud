import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<Category>;
    list(): Promise<Category[]>;
    findByName(name: string): Promise<Category>;
    findById(id: string): Promise<Category>;
    findDeletedById(id: string): Promise<Category>;
    softDelete(id: string): Promise<void>;
    restore(id: string): Promise<Category>;
}

export { ICategoryRepository };
