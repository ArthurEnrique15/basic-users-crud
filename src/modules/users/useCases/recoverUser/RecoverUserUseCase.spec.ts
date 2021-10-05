import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { RecoverUserUseCase } from "@modules/users/useCases/recoverUser/RecoverUserUseCase";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let recoverUserUseCase: RecoverUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let addressProvider: AddressProvider;

describe("Recover user", () => {
    beforeEach(() => {
        jest.setTimeout(60000);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        addressProvider = new AddressProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        recoverUserUseCase = new RecoverUserUseCase(userRepositoryInMemory);
    });

    it("Should be able to recover a deleted user", async () => {
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

        await userRepositoryInMemory.softDelete(userCreated);

        const userRecovered = await recoverUserUseCase.execute(userCreated.id);

        expect(userRecovered.deleted_at).toBe(null);
    });

    it("Should not be able to recover a user that wasn't deleted or doesn't exists", async () => {
        await expect(
            recoverUserUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("User wasn't deleted!"));
    });
});
