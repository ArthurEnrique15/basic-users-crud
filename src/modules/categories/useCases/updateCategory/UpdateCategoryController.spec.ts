import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let categoryRepository: CategoryRepository;

describe("Update category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        categoryRepository = new CategoryRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to update a category", async () => {
        const categoryCreated = await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        const response = await request(app)
            .put(`/categories/update/${categoryCreated.id}`)
            .send({
                name: "updated_category_test",
                description: "updated_description_test",
            });

        expect(response.status).toBe(200);
    });

    it("Should not be able to update a category that doesn't exists", async () => {
        const response = await request(app)
            .put(`/categories/update/${uuidV4()}`)
            .send({
                name: "updated_category_test",
                description: "updated_description_test",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a category without sending a name or description", async () => {
        const categoryCreated = await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        const response = await request(app)
            .put(`/categories/update/${categoryCreated.id}`)
            .send({});

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a category sending an existing name", async () => {
        const categoryCreated = await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        const response = await request(app)
            .put(`/categories/update/${categoryCreated.id}`)
            .send({
                name: categoryCreated.name,
            });

        expect(response.status).toBe(400);
    });
});
