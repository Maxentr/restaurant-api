import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import { UsersController } from "./users.controller"
import { CreateUserSchema } from "./validations/create-user"
import { UpdateUserSchema } from "./validations/update-user"

const usersRouter = Router()

// Create
usersRouter.post(
  "/",
  Auth("ADMIN"),
  validate(CreateUserSchema),
  UsersController.create,
)

// Read all
usersRouter.get("/", Auth("ADMIN"), UsersController.findAll)

// Read one
usersRouter.get(
  "/:id",
  Auth("CUSTOMER", "ADMIN"),
  validate(RouteIdSchema),
  UsersController.findOne,
)

// Update
usersRouter.patch(
  "/:id",
  Auth("ADMIN"),
  validate(UpdateUserSchema),
  UsersController.update,
)

// Delete
usersRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  UsersController.remove,
)

export default usersRouter
