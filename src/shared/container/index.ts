import { container } from "tsyringe";

import "@shared/container/providers";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { ICategoryRepository } from "@modules/categories/repositories/ICategoryRepository";
import { AddressRepository } from "@modules/users/infra/typeorm/repositories/AddressRepository";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { IAddressRepository } from "@modules/users/repositories/IAddressRepository";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IAddressRepository>(
    "AddressRepository",
    AddressRepository
);
