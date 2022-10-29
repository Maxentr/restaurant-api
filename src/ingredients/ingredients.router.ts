import express from "express"
import { IngredientsController } from "./ingredients.controller"

const ingredientsRouter = express.Router()

ingredientsRouter.post("/", IngredientsController.create)
ingredientsRouter.get("/", IngredientsController.findAll)
ingredientsRouter.get("/stock-type", IngredientsController.findAllSockType)
ingredientsRouter.get("/:id", IngredientsController.findOne)
ingredientsRouter.patch("/:id", IngredientsController.update)
ingredientsRouter.delete("/:id", IngredientsController.remove)

export default ingredientsRouter
