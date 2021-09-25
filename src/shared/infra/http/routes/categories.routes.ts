import { Router } from "express";

import { CreateCategoryController } from "@modules/categories/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/categories/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoriesController } from "@modules/categories/useCases/listCategories/ListCategoriesController";
import { RestoreCategoryController } from "@modules/categories/useCases/restoreCategory/RestoreCategoryController";
import { UpdateCategoryController } from "@modules/categories/useCases/updateCategory/UpdateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();
const restoreCategoryController = new RestoreCategoryController();
const updateCategoryController = new UpdateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.delete("/delete/:id", deleteCategoryController.handle);

categoriesRoutes.put("/restore/:id", restoreCategoryController.handle);

categoriesRoutes.put("/update/:id", updateCategoryController.handle);

export { categoriesRoutes };
