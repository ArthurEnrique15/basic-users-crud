import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
    create({ name, cpf, address, category }: ICreateUserDTO): Promise<User>;
    update({ id, name, cpf, address, category }: IUpdateUserDTO): Promise<User>;
    // softDelete();
    // restore();
    list(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByCpf(cpf: string): Promise<User>;
}

export { IUserRepository };
