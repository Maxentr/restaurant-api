import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { DishesController } from "./dishes.controller"
import { CreateDishSchema } from "./validations/create-dish"

const dishesRouter = Router()

// Create
dishesRouter.post("/", validate(CreateDishSchema), DishesController.create)

// Read all
dishesRouter.get("/", DishesController.findAll)
dishesRouter.post(
  "/array",
  validate(RouteIdsSchema),
  DishesController.findByArray,
)

// Read one
dishesRouter.get("/:id", validate(RouteIdSchema), DishesController.findOne)

// Update
dishesRouter.patch("/:id", validate(RouteIdSchema), DishesController.update)

// Delete
dishesRouter.delete("/:id", validate(RouteIdSchema), DishesController.remove)

export default dishesRouter
