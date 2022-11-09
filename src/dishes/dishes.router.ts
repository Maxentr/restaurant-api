import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import { DishesController } from "./dishes.controller"
import { CreateDishSchema } from "./validations/create-dish"

const dishesRouter = Router()

// Create
dishesRouter.post(
  "/",
  Auth("ADMIN"),
  validate(CreateDishSchema),
  DishesController.create,
)

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
dishesRouter.patch(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  DishesController.update,
)

// Delete
dishesRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  DishesController.remove,
)

export default dishesRouter
