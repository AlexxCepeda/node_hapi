import { Router } from "express";

import userController from "../controllers/user.controllers.js";
import userMiddlewares from "../middlewares/user.middleware.js";

const router = Router();

router.get("/users", userController.getUsers);

router.get(
  "/users/:id",
  userMiddlewares.validateId,
  userController.getUserById
);

router.post(
  "/users",
  userMiddlewares.validateCreate,
  userController.createUser
);

router.delete(
  "/users/:id",
  userMiddlewares.validateId,
  userController.deleteUserById
);

router.put(
  "/users/:id",
  userMiddlewares.validateId,
  userMiddlewares.validatePatch,
  userController.updateUserById
);

export default router;
