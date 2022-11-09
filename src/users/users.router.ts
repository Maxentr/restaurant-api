import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { UsersController } from "./users.controller"
import { CreateUserSchema } from "./validations/create-user"
import { UpdateUserSchema } from "./validations/update-user"

const usersRouter = Router()

// Create
usersRouter.post("/", validate(CreateUserSchema), UsersController.create)

// Read all
usersRouter.get("/", UsersController.findAll)

// Read one
usersRouter.get("/:id", validate(RouteIdSchema), UsersController.findOne)

// Update
usersRouter.patch("/:id", validate(UpdateUserSchema), UsersController.update)

// Delete
usersRouter.delete("/:id", validate(RouteIdSchema), UsersController.remove)

export default usersRouter
