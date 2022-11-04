import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { DishesController } from "./dishes.controller"
import { CreateDishSchema } from "./validations/create-dish"

const dishesRouter = Router()

dishesRouter.post("/", validate(CreateDishSchema), DishesController.create)
dishesRouter.get("/", DishesController.findAll)
dishesRouter.get(
  "/array/:ids",
  validate(RouteIdsSchema),
  DishesController.findByArray,
)
dishesRouter.get("/:id", validate(RouteIdSchema), DishesController.findOne)
dishesRouter.patch("/:id", validate(RouteIdSchema), DishesController.update)
dishesRouter.delete("/:id", validate(RouteIdSchema), DishesController.remove)

export default dishesRouter
