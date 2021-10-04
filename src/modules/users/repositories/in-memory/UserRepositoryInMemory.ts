import { v4 as uuidV4 } from "uuid";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({
        name,
        cpf,
        address,
        category,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuidV4(), name, cpf, address, category });

        this.users.push(user);

        return user;
    }

    async update({
        id,
        name,
        cpf,
        address,
        category,
    }: IUpdateUserDTO): Promise<User> {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (name) this.users[userIndex].name = name;

        if (cpf) this.users[userIndex].cpf = cpf;

        if (address) this.users[userIndex].address = address;

        if (category) this.users[userIndex].category = category;

        this.users[userIndex].updated_at = new Date();

        return this.users[userIndex];
    }

    async softDelete(userDelete: User): Promise<User> {
        const userIndex = this.users.findIndex(
            (user) => user.id === userDelete.id
        );

        this.users[userIndex].updated_at = new Date();
        this.users[userIndex].deleted_at = new Date();

        return this.users[userIndex];
    }

    async recover(userRestore: User): Promise<User> {
        const userIndex = this.users.findIndex(
            (user) => user.id === userRestore.id
        );

        this.users[userIndex].updated_at = new Date();
        this.users[userIndex].deleted_at = null;

        return this.users[userIndex];
    }

    async list(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }

    async findByCpf(cpf: string): Promise<User> {
        return this.users.find((user) => user.cpf === cpf);
    }

    async findDeletedById(id: string): Promise<User> {
        return this.users.find(
            (user) => user.id === id && user.deleted_at !== null
        );
    }
}

export { UserRepositoryInMemory };
