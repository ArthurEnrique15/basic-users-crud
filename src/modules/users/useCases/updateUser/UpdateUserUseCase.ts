import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name?: string;
    numero?: string;
    cep?: string;
    category_id?: string;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({
        id,
        name,
        numero,
        cep,
        category_id,
    }: IRequest): Promise<User> {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) throw new AppError("User doesn't exists!");

        if (!name && !numero && !cep && !category_id)
            throw new AppError("There's no information to update!");

        const userAlreadyExists = await this.userRepository.findByName(name);

        if (userAlreadyExists) throw new AppError("User already exists!");

        const updatedUser = await this.userRepository.update({
            id,
            name,
            description,
        });

        return updatedUser;
    }
}

export { UpdateUserUseCase };
