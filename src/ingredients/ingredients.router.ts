import { Router } from "express"
import { validate } from "../../utils/validation"
import { UpdateIngredientSchema } from "./validations/update-ingredient"
import { IngredientsController } from "./ingredients.controller"
import { CreateIngredientSchema } from "./validations/create-ingredient"
import { RouteIdSchema } from "../../utils/generic-schema"

const ingredientsRouter = Router()

// Create
ingredientsRouter.post(
  "/",
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
  validate(UpdateIngredientSchema),
  IngredientsController.update,
)

// Delete
ingredientsRouter.delete(
  "/:id",
  validate(RouteIdSchema),
  IngredientsController.remove,
)

export default ingredientsRouter
