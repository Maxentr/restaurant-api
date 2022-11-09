import { Router } from "express"
import { validate } from "../../utils/validation"
import { UpdateIngredientSchema } from "./validations/update-ingredient"
import { IngredientsController } from "./ingredients.controller"
import { CreateIngredientSchema } from "./validations/create-ingredient"
import { RouteIdSchema } from "../../utils/generic-schema"
import Auth from "../auth/auth.middleware"

const ingredientsRouter = Router()

// Create
ingredientsRouter.post(
  "/",
  Auth("ADMIN"),
  validate(CreateIngredientSchema),
  IngredientsController.create,
)

// Read all
ingredientsRouter.get("/", IngredientsController.findAll)
ingredientsRouter.get("/stock-type", IngredientsController.findAllSockType)

// Read one
ingredientsRouter.get(
  "/:id",
  validate(RouteIdSchema),
  IngredientsController.findOne,
)

// Update
ingredientsRouter.patch(
  "/:id",
  Auth("ADMIN"),
  validate(UpdateIngredientSchema),
  IngredientsController.update,
)

// Delete
ingredientsRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  IngredientsController.remove,
)

export default ingredientsRouter
