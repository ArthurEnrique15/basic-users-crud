import { container } from "tsyringe";

import { CategoryRepository } from "@modules/users/infra/typeorm/repositories/CategoryRepository";
import { ICategoryRepository } from "@modules/users/repositories/ICategoryRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);
