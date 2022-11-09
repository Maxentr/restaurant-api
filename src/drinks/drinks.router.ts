import express from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import { DrinksController } from "./drinks.controller"
import { CreateDrinkSchema } from "./validations/create-drink"
import { UpdateDrinkSchema } from "./validations/update-drink"

const drinksRouter = express.Router()

// Create
drinksRouter.post(
  "/",
  Auth("ADMIN"),
  validate(CreateDrinkSchema),
  DrinksController.create,
)

// Read all
drinksRouter.get("/", DrinksController.findAll)
drinksRouter.post(
  "/array",
  validate(RouteIdsSchema),
  DrinksController.findByArray,
)

// Read one
drinksRouter.get("/:id", validate(RouteIdSchema), DrinksController.findOne)

// Update
drinksRouter.patch(
  "/:id",
  Auth("ADMIN"),
  validate(UpdateDrinkSchema),
  DrinksController.update,
)

// Delete
drinksRouter.delete(
  "/:id",
  Auth("ADMIN"),
  validate(RouteIdSchema),
  DrinksController.remove,
)

export default drinksRouter
