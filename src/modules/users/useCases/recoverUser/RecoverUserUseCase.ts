import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RecoverUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<User> {
        const deletedUser = await this.userRepository.findDeletedById(id);

        if (!deletedUser) throw new AppError("User wasn't deleted!");

        const recoveredUser = await this.userRepository.recover(deletedUser);

        return recoveredUser;
    }
}

export { RecoverUserUseCase };
