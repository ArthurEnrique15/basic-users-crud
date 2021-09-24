import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<Category>;
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
}

export { ICategoryRepository };
