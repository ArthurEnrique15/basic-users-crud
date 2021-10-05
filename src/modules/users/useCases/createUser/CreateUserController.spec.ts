import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let categoryRepository: CategoryRepository;

describe("Create user controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

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

    it("Should be able to create a new user", async () => {
        const { id: category_id } = await categoryRepository.findByName(
            "category_test"
        );

        const response = await request(app).post("/users").send({
            name: "user_test_1",
            cpf: "136.927.690-75",
            cep: "35930209",
            numero: 131,
            category_id,
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new user sending an empty name, cpf or a number less than 0", async () => {
        const { id: category_id } = await categoryRepository.findByName(
            "category_test"
        );

        const response = await request(app).post("/users").send({
            name: "",
            cpf: "",
            cep: "35930209",
            numero: -10,
            category_id,
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a user that already exists", async () => {
        const { id: category_id } = await categoryRepository.findByName(
            "category_test"
        );

        const response = await request(app).post("/users").send({
            name: "user_test_1",
            cpf: "136.927.690-75",
            cep: "35930209",
            numero: 131,
            category_id,
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a user sending a non existing category", async () => {
        const response = await request(app).post("/users").send({
            name: "user_test_2",
            cpf: "760.156.190-90",
            cep: "35930209",
            numero: 131,
            category_id: "non_existing_category_id",
        });

        expect(response.status).toBe(500);
    });

    it("Should not be able to create a user sending a non existing cep", async () => {
        const { id: category_id } = await categoryRepository.findByName(
            "category_test"
        );

        const response = await request(app).post("/users").send({
            name: "user_test_2",
            cpf: "760.156.190-90",
            cep: "11111111",
            numero: 131,
            category_id,
        });

        expect(response.status).toBe(500);
    });
});
