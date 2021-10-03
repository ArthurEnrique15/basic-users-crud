import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
// const removeUserController = new RemoveUserController();
// const recoverUserController = new RecoverUserController();
// const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listUsersController.handle);

// usersRoutes.delete("/delete/:id", removeUserController.handle);

// usersRoutes.put("/recover/:id", recoverUserController.handle);

// usersRoutes.put("/update/:id", updateUserController.handle);

export { usersRoutes };
