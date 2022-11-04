import express from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { DrinksController } from "./drinks.controller"
import { CreateDrinkSchema } from "./validations/create-drink"
import { UpdateDrinkSchema } from "./validations/update-drink"

const drinksRouter = express.Router()

// Create
drinksRouter.post("/", validate(CreateDrinkSchema), DrinksController.create)

// Read all
drinksRouter.get("/", DrinksController.findAll)
drinksRouter.get(
  "/array/:ids",
  validate(RouteIdsSchema),
  DrinksController.findByArray,
)

// Read one
drinksRouter.get("/:id", validate(RouteIdSchema), DrinksController.findOne)

// Update
drinksRouter.patch("/:id", validate(UpdateDrinkSchema), DrinksController.update)

// Delete
drinksRouter.delete("/:id", validate(RouteIdSchema), DrinksController.remove)

export default drinksRouter
