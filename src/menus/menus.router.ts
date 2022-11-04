import express from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { MenusController } from "./menus.controller"
import { CreateMenuSchema } from "./validations/create-menu"
import { UpdateMenuSchema } from "./validations/update-menu"

const menusRouter = express.Router()

menusRouter.post("/", validate(CreateMenuSchema), MenusController.create)
menusRouter.get("/", MenusController.findAll)
menusRouter.get(
  "/array/:ids",
  validate(RouteIdsSchema),
  MenusController.findByArray,
)
menusRouter.get("/:id", validate(RouteIdSchema), MenusController.findOne)
menusRouter.patch("/:id", validate(UpdateMenuSchema), MenusController.update)
menusRouter.delete("/:id", validate(RouteIdSchema), MenusController.remove)

export default menusRouter
