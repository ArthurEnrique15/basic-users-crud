import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("List categories", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        listCategoriesUseCase = new ListCategoriesUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to list all categories", async () => {
        await categoryRepositoryInMemory.create({
            name: "Category test",
            description: "Description test",
        });

        const categories = await listCategoriesUseCase.execute();

        expect(categories.length).toBe(1);
    });
});
