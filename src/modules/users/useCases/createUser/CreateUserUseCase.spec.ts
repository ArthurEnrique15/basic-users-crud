import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { AddressRepositoryInMemory } from "@modules/users/repositories/in-memory/AddressRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/useCases/createUser/CreateUserUseCase";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let addressProvider: AddressProvider;

describe("Create user", () => {
    beforeEach(() => {
        jest.setTimeout(60000);
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        addressProvider = new AddressProvider();
        userRepositoryInMemory = new UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(
            userRepositoryInMemory,
            categoryRepositoryInMemory,
            addressRepositoryInMemory,
            addressProvider
        );
    });

    it("Should be able to create a new user", async () => {
        const { id: category_id } = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        const userCreated = await createUserUseCase.execute({
            name: "user_test",
            cpf: "136.927.690-75",
            cep: "35930209",
            numero: 131,
            category_id,
        });

        expect(userCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new user sending an empty name, cpf or a number less than 0", async () => {
        const { id: category_id } = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await expect(
            createUserUseCase.execute({
                name: "",
                cpf: "",
                cep: "35930209",
                numero: -10,
                category_id,
            })
        ).rejects.toEqual(new AppError("Invalid information!"));
    });

    it("Should not be able to create a user that already exists", async () => {
        const { id: category_id } = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await createUserUseCase.execute({
            name: "user_test_1",
            cpf: "136.927.690-75",
            cep: "35930209",
            numero: 131,
            category_id,
        });

        await expect(
            createUserUseCase.execute({
                name: "user_test_2",
                cpf: "136.927.690-75",
                cep: "35930209",
                numero: 131,
                category_id,
            })
        ).rejects.toEqual(new AppError("User already exists!"));
    });

    it("Should not be able to create a user sending a non existing category", async () => {
        await expect(
            createUserUseCase.execute({
                name: "user_test_1",
                cpf: "136.927.690-75",
                cep: "35930209",
                numero: 131,
                category_id: "non_existing_category_id",
            })
        ).rejects.toEqual(new AppError("Category doesn't exists!"));
    });

    it("Should not be able to create a user sending a non existing cep", async () => {
        const { id: category_id } = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await expect(
            createUserUseCase.execute({
                name: "user_test",
                cpf: "136.927.690-75",
                cep: "11111111",
                numero: 131,
                category_id,
            })
        ).rejects.toEqual(new AppError("Invalid CEP!"));
    });
});
