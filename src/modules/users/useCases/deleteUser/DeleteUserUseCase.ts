import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) throw new AppError("User doesn't exists!");

        const deletedUser = await this.userRepository.softDelete(user);

        return deletedUser;
    }
}

export { DeleteUserUseCase };
