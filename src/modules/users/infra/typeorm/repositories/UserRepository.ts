import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";

import { User } from "../entities/User";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        cpf,
        address,
        category,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({ name, cpf, address, category });
        await this.repository.save(user);
        return user;
    }

    // update() {
    //     throw new Error("Method not implemented.");
    // }
    // softDelete() {
    //     throw new Error("Method not implemented.");
    // }
    // restore() {
    //     throw new Error("Method not implemented.");
    // }

    async list(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ id });
        return user;
    }

    async findByCpf(cpf: string): Promise<User> {
        const user = await this.repository.findOne({ cpf });
        return user;
    }
}

export { UserRepository };
