import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import { DishesController } from "./dishes.controller"
import { CreateDishSchema } from "./validations/create-dish"
import { findAllByCategorySchema } from "./validations/find-category"
import { UpdateDishSchema } from "./validations/update-dish"

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
dishesRouter.get(
  "/category/:category",
  validate(findAllByCategorySchema),
  DishesController.findAllByCategory,
)
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
  validate(UpdateDishSchema),
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
