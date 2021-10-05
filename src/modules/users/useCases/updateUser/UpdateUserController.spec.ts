import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

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

describe("Update user controller", () => {
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

    it("Should be able to update a user", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({
                name: "updated_user_test",
                cpf: "495.175.310-36",
            });

        expect(response.status).toBe(200);
    });

    it("Should not be able to update a user that doesn't exists", async () => {
        const response = await request(app)
            .put(`/users/update/${uuidV4()}`)
            .send({
                name: "updated_user_test",
                cpf: "863.850.870-00",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a user without sending information", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({});

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a user sending an empty name, cpf or a number less than 0", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({
                name: "",
                cpf: "",
                numero: -10,
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a user sending an existing cpf", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({
                name: "updated_user_test",
                cpf: user.cpf,
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a user sending a non existing category", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({
                category_id: "non_existing_category_id",
            });

        expect(response.status).toBe(500);
    });

    it("Should not be able to update a user sending a non existing cep", async () => {
        const category = await categoryRepository.findByName("category_test");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const user = await userRepository.create({
            name: "user_test",
            cpf: "136.927.690-75",
            address: createdAddress,
            category,
        });

        const response = await request(app)
            .put(`/users/update/${user.id}`)
            .send({
                cep: "11111111",
            });

        expect(response.status).toBe(500);
    });
});
