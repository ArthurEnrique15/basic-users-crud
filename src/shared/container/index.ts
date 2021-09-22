import { container } from "tsyringe";

import { ICategoryRepository } from "../../modules/repositories/ICategoryRepository";
import { CategoryRepository } from "../../modules/repositories/implementations/CategoryRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);
