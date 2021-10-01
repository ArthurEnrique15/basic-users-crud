import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { RecoverCategoryUseCase } from "@modules/categories/useCases/recoverCategory/RecoverCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let recoverCategoryUseCase: RecoverCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Recover category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        recoverCategoryUseCase = new RecoverCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to recover a deleted category", async () => {
        const category = await categoryRepositoryInMemory.create({
            name: "category_test",
            description: "description_test",
        });

        await categoryRepositoryInMemory.softRemove(category);

        const categoryRecovered = await recoverCategoryUseCase.execute(
            category.id
        );

        expect(categoryRecovered.deleted_at).toBe(null);
    });

    it("Should not be able to recover a category that doesn't exists", async () => {
        await expect(
            recoverCategoryUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Category wasn't deleted!"));
    });
});
