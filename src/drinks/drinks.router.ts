import express from "express";
import { DrinksController } from "./drinks.controller";

const drinksRouter = express.Router();

drinksRouter.post("/", DrinksController.create);
drinksRouter.get("/", DrinksController.findAll);
drinksRouter.get("/array/:ids", DrinksController.findByArray);
drinksRouter.get("/:id", DrinksController.findOne);
drinksRouter.patch("/:id", DrinksController.update);
drinksRouter.delete("/:id", DrinksController.remove);

export default drinksRouter;
