import request from "supertest";
import { Connection, createConnection } from "typeorm";

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
        const category = await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        const response = await request(app)
            .put(`/categories/update/${category.id}`)
            .send({
                name: "updated_category_test",
                description: "updated_description_test",
            });

        expect(response.status).toBe(200);
    });
});
