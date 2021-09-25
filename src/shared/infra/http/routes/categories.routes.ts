import { Router } from "express";

import { CreateCategoryController } from "@modules/users/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/users/useCases/deleteCategory/DeleteCategoryController";
import { ListCategoriesController } from "@modules/users/useCases/listCategories/ListCategoriesController";
import { RestoreCategoryController } from "@modules/users/useCases/restoreCategory/RestoreCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();
const restoreCategoryController = new RestoreCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.delete("/delete/:id", deleteCategoryController.handle);

categoriesRoutes.put("/restore/:id", restoreCategoryController.handle);

export { categoriesRoutes };
