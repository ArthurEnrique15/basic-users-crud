import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use("/category", categoriesRoutes);

export { router };
