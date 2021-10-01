import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let categoryRepository: CategoryRepository;

describe("List categories controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        categoryRepository = new CategoryRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all categories", async () => {
        await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        const response = await request(app).get("/categories").send();

        expect(response.status).toBe(200);
    });
});
