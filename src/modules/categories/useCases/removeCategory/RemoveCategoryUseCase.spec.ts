import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { RemoveCategoryUseCase } from "@modules/categories/useCases/removeCategory/RemoveCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let removeCategoryUseCase: RemoveCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Remove category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        removeCategoryUseCase = new RemoveCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to remove a category", async () => {
        const category = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        const categoryRemoved = await removeCategoryUseCase.execute(
            category.id
        );

        expect(categoryRemoved.deleted_at).not.toBe(null);
    });

    it("Should not be able to remove a category that doesn't exists", async () => {
        await expect(
            removeCategoryUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Category doesn't exists!"));
    });
});
