import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { AddressRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

let updateUserUseCase: UpdateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let addressProvider: AddressProvider;

describe("Update user", () => {
    beforeEach(() => {
        jest.setTimeout(60000);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        addressProvider = new AddressProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        updateUserUseCase = new UpdateUserUseCase(
            userRepositoryInMemory,
            categoryRepositoryInMemory,
            addressRepositoryInMemory,
            addressProvider
        );
    });

    it("Should be able to update a user", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category_test_1 = await categoryRepositoryInMemory.create({
            name: "category_test_1",
            description: "description_test_1",
        });

        const category_test_2 = await categoryRepositoryInMemory.create({
            name: "category_test_2",
            description: "description_test_2",
        });

        const { id } = await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category: category_test_1,
        });

        const updatedUser = await updateUserUseCase.execute({
            id,
            name: "updated_user_test",
            cpf: "813.024.130-74",
            cep: "35930201",
            numero: 130,
            category_id: category_test_2.id,
        });

        expect(updatedUser.updated_at).not.toBe(null);
        expect(updatedUser.name).toBe("updated_user_test");
        expect(updatedUser.cpf).toBe("813.024.130-74");
        expect(updatedUser.address.cep).toBe("35930201");
        expect(updatedUser.address.numero).toBe(130);
        expect(updatedUser.category.id).toBe(category_test_2.id);
    });

    it("Should not be able to update a user that doesn't exists", async () => {
        await expect(
            updateUserUseCase.execute({
                id: "non_existing_id",
                name: "non_existing_name",
            })
        ).rejects.toEqual(new AppError("User doesn't exists!"));
    });

    it("Should not be able to update a user without sending information", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        const userCreated = await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category,
        });

        await expect(
            updateUserUseCase.execute({
                id: userCreated.id,
            })
        ).rejects.toEqual(new AppError("There's no information to update!"));
    });

    it("Should not be able to update a user sending an empty name, cpf or a number less than 0", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        const userCreated = await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category,
        });

        await expect(
            updateUserUseCase.execute({
                id: userCreated.id,
                name: "",
                cpf: "",
                numero: -10,
            })
        ).rejects.toEqual(new AppError("Invalid information!"));
    });

    it("Should not be able to update a user sending an existing cpf", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category = await categoryRepositoryInMemory.create({
            name: "category_test_1",
            description: "description_test_1",
        });

        const userCreated = await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category,
        });

        await expect(
            updateUserUseCase.execute({
                id: userCreated.id,
                cpf: userCreated.cpf,
            })
        ).rejects.toEqual(new AppError("User already exists!"));
    });

    it("Should not be able to update a user sending a non existing category id", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category = await categoryRepositoryInMemory.create({
            name: "category_test_1",
            description: "description_test_1",
        });

        const userCreated = await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category,
        });

        await expect(
            updateUserUseCase.execute({
                id: userCreated.id,
                category_id: "non_existing_category_id",
            })
        ).rejects.toEqual(new AppError("Category doesn't exists!"));
    });
});
