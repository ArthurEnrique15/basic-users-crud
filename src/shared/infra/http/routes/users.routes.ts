import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/users/useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "@modules/users/useCases/listUsers/ListUsersController";
import { RecoverUserController } from "@modules/users/useCases/recoverUser/RecoverUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUser/UpdateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const recoverUserController = new RecoverUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listUsersController.handle);

usersRoutes.delete("/delete/:id", deleteUserController.handle);

usersRoutes.put("/recover/:id", recoverUserController.handle);

usersRoutes.put("/update/:id", updateUserController.handle);

export { usersRoutes };
