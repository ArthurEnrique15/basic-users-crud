import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/users/useCases/createCategory/CreateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

export { categoriesRoutes };
