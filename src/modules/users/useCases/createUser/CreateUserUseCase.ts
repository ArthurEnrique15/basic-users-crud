import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { Address } from "@modules/users/infra/typeorm/entities/Address";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IAddressProvider } from "@shared/container/providers/addressProvider/model/IAddressProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    cep: string;
    numero: number;
    category_id: string;
}

interface IResponse {
    id: string;
    name: string;
    address: Address;
    category: Category;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

@injectable()
class CreateUserUseCase {
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
        name,
        cep,
        numero,
        category_id,
    }: IRequest): Promise<IResponse> {
        if (!name) throw new AppError("Invalid name!");

        const categoryExists = await this.categoryRepository.findById(
            category_id
        );

        if (!categoryExists) throw new AppError("Category doesn't exists!");

        if (numero <= 0) throw new AppError("Invalid number!");

        const address = await this.addressProvider.getAddress(cep, numero);

        if (!address) throw new AppError("Invalid CEP!");

        const createdAddress = await this.addressRepository.create(address);

        const userCreated = await this.userRepository.create({
            name,
            address: createdAddress,
            category: categoryExists,
        });

        const responseUser: IResponse = {
            id: userCreated.id,
            name: userCreated.name,
            address: userCreated.address,
            category: userCreated.category,
            created_at: userCreated.created_at,
            updated_at: userCreated.updated_at,
            deleted_at: userCreated.deleted_at,
        };

        return responseUser;
    }
}

export { CreateUserUseCase };
