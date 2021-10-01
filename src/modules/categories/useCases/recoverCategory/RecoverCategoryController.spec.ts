import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CategoryRepository } from "@modules/categories/infra/typeorm/repositories/CategoryRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let categoryRepository: CategoryRepository;

describe("Recover category controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        categoryRepository = new CategoryRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to recover a category", async () => {
        const category = await categoryRepository.create({
            name: "category_test",
            description: "description_test",
        });

        categoryRepository.softRemove(category);

        const response = await request(app)
            .put(`/categories/recover/${category.id}`)
            .send();

        expect(response.status).toBe(200);
    });

    it("Should not be able to recover a category that doesn't exists", async () => {
        const response = await request(app)
            .put(`/categories/recover/${uuidV4()}`)
            .send();

        expect(response.status).toBe(400);
    });
});
