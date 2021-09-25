import { Router } from "express";

import { CreateCategoryController } from "@modules/categories/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/categories/useCases/listCategories/ListCategoriesController";
import { RecoverCategoryController } from "@modules/categories/useCases/recoverCategory/RecoverCategoryController";
import { RemoveCategoryController } from "@modules/categories/useCases/removeCategory/RemoveCategoryController";
import { UpdateCategoryController } from "@modules/categories/useCases/updateCategory/UpdateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const removeCategoryController = new RemoveCategoryController();
const recoverCategoryController = new RecoverCategoryController();
const updateCategoryController = new UpdateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.delete("/delete/:id", removeCategoryController.handle);

categoriesRoutes.put("/restore/:id", recoverCategoryController.handle);

categoriesRoutes.put("/update/:id", updateCategoryController.handle);

export { categoriesRoutes };
