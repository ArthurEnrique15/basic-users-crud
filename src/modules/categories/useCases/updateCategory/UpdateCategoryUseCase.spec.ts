import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

let updateCategoryUseCase: UpdateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Update category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        updateCategoryUseCase = new UpdateCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to update a category", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        };

        await categoryRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id } = await categoryRepositoryInMemory.findByName(
            category.name
        );

        const updatedCategory = await updateCategoryUseCase.execute({
            id,
            name: "Updated category name",
            description: "Updated category description",
        });

        expect(updatedCategory.updated_at).not.toBe(null);
        expect(updatedCategory.name).toBe("Updated category name");
        expect(updatedCategory.description).toBe(
            "Updated category description"
        );
    });

    it("Should not be able to update a category that doesn't exists", async () => {
        await expect(
            updateCategoryUseCase.execute({
                id: "id",
                name: "name",
            })
        ).rejects.toEqual(new AppError("Category doesn't exists!"));
    });

    it("Should not be able to update a category without sending a name or description", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        };

        await categoryRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id } = await categoryRepositoryInMemory.findByName(
            category.name
        );

        await expect(
            updateCategoryUseCase.execute({
                id,
            })
        ).rejects.toEqual(new AppError("There's no information to update!"));
    });

    it("Should not be able to update a category sending an existing name", async () => {
        const category = {
            name: "Category test",
            description: "Category description test",
        };

        await categoryRepositoryInMemory.create({
            name: category.name,
            description: category.description,
        });

        const { id, name } = await categoryRepositoryInMemory.findByName(
            category.name
        );

        await expect(
            updateCategoryUseCase.execute({
                id,
                name,
            })
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
