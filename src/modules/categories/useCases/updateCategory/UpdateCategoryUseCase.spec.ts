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
        const { id } = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        const updatedCategory = await updateCategoryUseCase.execute({
            id,
            name: "updated_category_test",
            description: "updated_description_test",
        });

        expect(updatedCategory.updated_at).not.toBe(null);
        expect(updatedCategory.name).toBe("updated_category_test");
        expect(updatedCategory.description).toBe("updated_description_test");
    });

    it("Should not be able to update a category that doesn't exists", async () => {
        await expect(
            updateCategoryUseCase.execute({
                id: "non_existing_id",
                name: "non_existing_name",
            })
        ).rejects.toEqual(new AppError("Category doesn't exists!"));
    });

    it("Should not be able to update a category without sending a name or description", async () => {
        const categoryCreated = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await expect(
            updateCategoryUseCase.execute({
                id: categoryCreated.id,
            })
        ).rejects.toEqual(new AppError("There's no information to update!"));
    });

    it("Should not be able to update a category sending an existing name", async () => {
        const categoryCreated = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await expect(
            updateCategoryUseCase.execute({
                id: categoryCreated.id,
                name: categoryCreated.name,
            })
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
