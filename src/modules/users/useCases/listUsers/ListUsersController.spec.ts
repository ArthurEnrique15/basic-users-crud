import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { AddressRepository } from "@modules/users/infra/typeorm/repositories/AddressRepository";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let userRepository: UserRepository;
let categoryRepository: CategoryRepository;
let addressRepository: AddressRepository;
let addressProvider: AddressProvider;

describe("List users controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        userRepository = new UserRepository();
        addressProvider = new AddressProvider();
        addressRepository = new AddressRepository();
        categoryRepository = new CategoryRepository();

        await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all users", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app).get("/users").send();

        expect(response.status).toBe(200);
    });
});
