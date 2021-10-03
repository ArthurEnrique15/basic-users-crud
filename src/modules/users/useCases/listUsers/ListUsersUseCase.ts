import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute(): Promise<User[]> {
        const users = await this.userRepository.list();

        return users;
    }
}

export { ListUsersUseCase };
