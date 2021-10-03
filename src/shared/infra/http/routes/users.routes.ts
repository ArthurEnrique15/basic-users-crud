import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
// import { ListCategoriesController } from "@modules/users/useCases/listCategories/ListCategoriesController";
// import { RecoverUserController } from "@modules/users/useCases/recoverUser/RecoverUserController";
// import { RemoveUserController } from "@modules/users/useCases/removeUser/RemoveUserController";
// import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
// const listCategoriesController = new ListCategoriesController();
// const removeUserController = new RemoveUserController();
// const recoverUserController = new RecoverUserController();
// const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);

// usersRoutes.get("/", listCategoriesController.handle);

// usersRoutes.delete("/delete/:id", removeUserController.handle);

// usersRoutes.put("/recover/:id", recoverUserController.handle);

// usersRoutes.put("/update/:id", updateUserController.handle);

export { usersRoutes };
