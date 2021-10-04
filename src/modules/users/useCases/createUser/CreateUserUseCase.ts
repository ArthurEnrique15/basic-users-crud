import { inject, injectable } from "tsyringe";

import { Category } from "@modules/categories/infra/typeorm/entities/Category";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { Address } from "@modules/users/infra/typeorm/entities/Address";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { IAddressProvider } from "@shared/container/providers/addressProvider/IAddressProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    cpf: string;
    cep: string;
    numero: number;
    category_id: string;
}

interface IResponse {
    id: string;
    name: string;
    cpf: string;
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
        cpf,
        cep,
        numero,
        category_id,
    }: IRequest): Promise<IResponse> {
        if (name === "" || cpf === "" || numero <= 0)
            throw new AppError("Invalid information!");

        const userCpfAlreadyExists = await this.userRepository.findByCpf(cpf);

        if (userCpfAlreadyExists) throw new AppError("User already exists!");

        const categoryExists = await this.categoryRepository.findById(
            category_id
        );

        if (!categoryExists) throw new AppError("Category doesn't exists!");

        const address = await this.addressProvider.getAddress(cep, numero);

        const createdAddress = await this.addressRepository.save(address);

        const userCreated = await this.userRepository.create({
            name,
            cpf,
            address: createdAddress,
            category: categoryExists,
        });

        const responseUser: IResponse = {
            id: userCreated.id,
            name: userCreated.name,
            cpf: userCreated.cpf,
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
