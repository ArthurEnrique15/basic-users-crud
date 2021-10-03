import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";

import { User } from "../entities/User";

class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, address, category }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({ name, address, category });
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
    // list() {
    //     throw new Error("Method not implemented.");
    // }
}

export { UserRepository };
