import { CategoryRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "@modules/categories/useCases/createCategory/CreateCategoryUseCase";
import { AppError } from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoryRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoryRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const categoryCreated = await createCategoryUseCase.execute({
            name: "category_test",
            description: "description_test",
        });

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with an existing name", async () => {
        await createCategoryUseCase.execute({
            name: "category_test",
            description: "description_test",
        });

        await expect(
            createCategoryUseCase.execute({
                name: "category_test",
                description: "description_test",
            })
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
