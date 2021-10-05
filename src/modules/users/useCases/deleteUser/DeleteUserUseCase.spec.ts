import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { DeleteUserUseCase } from "@modules/users/useCases/deleteUser/DeleteUserUseCase";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let deleteUserUseCase: DeleteUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let addressProvider: AddressProvider;

describe("Delete user", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        addressProvider = new AddressProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
    });

    it("Should be able to delete a user", async () => {
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

        const userDeleted = await deleteUserUseCase.execute(userCreated.id);

        expect(userDeleted.deleted_at).not.toBe(null);
    });

    it("Should not be able to delete a user that doesn't exists", async () => {
        await expect(
            deleteUserUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("User doesn't exists!"));
    });
});
