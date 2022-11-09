import express from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import { MenusController } from "./menus.controller"
import { CreateMenuSchema } from "./validations/create-menu"
import { UpdateMenuSchema } from "./validations/update-menu"

const menusRouter = express.Router()

// Create
menusRouter.post("/", Auth("ADMIN"), validate(CreateMenuSchema), MenusController.create)

// Read all
menusRouter.get("/", MenusController.findAll)
menusRouter.post(
  "/array",
  validate(RouteIdsSchema),
  MenusController.findByArray,
)

// Read one
menusRouter.get("/:id", validate(RouteIdSchema), MenusController.findOne)

// Update
menusRouter.patch("/:id", Auth("ADMIN"), validate(UpdateMenuSchema), MenusController.update)

// Delete
menusRouter.delete("/:id", Auth("ADMIN"), validate(RouteIdSchema), MenusController.remove)

export default menusRouter
