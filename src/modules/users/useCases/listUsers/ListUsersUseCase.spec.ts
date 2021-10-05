import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";

import { ListUsersUseCase } from "./ListUsersUseCase";

let listUsersUseCase: ListUsersUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let addressProvider: AddressProvider;

describe("List users", () => {
    beforeEach(() => {
        jest.setTimeout(60000);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        addressProvider = new AddressProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        listUsersUseCase = new ListUsersUseCase(userRepositoryInMemory);
    });

    it("Should be able to list all users", async () => {
        const address = await addressProvider.getAddress("35930209", 131);

        const category = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await userRepositoryInMemory.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address,
            category,
        });

        const users = await listUsersUseCase.execute();

        expect(users.length).toBe(1);
    });
});
