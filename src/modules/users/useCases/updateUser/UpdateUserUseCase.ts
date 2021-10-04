import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IAddressProvider } from "@shared/container/providers/addressProvider/IAddressProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name?: string;
    cpf?: string;
    numero?: number;
    cep?: string;
    category_id?: string;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository,
        @inject("AddressRepository")
        private addressRepository: IAddressRepository,
        @inject("AddressProvider")
        private addressProvider: IAddressProvider
    ) {}

    async execute({
        id,
        name,
        cpf,
        numero,
        cep,
        category_id,
    }: IRequest): Promise<User> {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) throw new AppError("User doesn't exists!");

        if (!name && !cpf && !numero && !cep && !category_id)
            throw new AppError("There's no information to update!");

        if (name === "" || cpf === "" || numero <= 0)
            throw new AppError("Invalid information!");

        const userAlreadyExists = await this.userRepository.findByCpf(cpf);

        if (userAlreadyExists) throw new AppError("User already exists!");

        let categoryExists: Category;
        if (category_id) {
            categoryExists = await this.categoryRepository.findById(
                category_id
            );

            if (!categoryExists) throw new AppError("Category doesn't exists!");
        }

        // eslint-disable-next-line no-param-reassign
        if (!cep) cep = userExists.address.cep;
        // eslint-disable-next-line no-param-reassign
        if (!numero) numero = userExists.address.numero;
        const address = await this.addressProvider.getAddress(cep, numero);

        address.id = userExists.address.id;

        const updatedAddress = await this.addressRepository.save(address);

        const updatedUser = await this.userRepository.update({
            id,
            name,
            cpf,
            address: updatedAddress,
            category: categoryExists,
        });

        return updatedUser;
    }
}

export { UpdateUserUseCase };
