import express from "express";
import { DishesController } from "./dishes.controller";

const dishesRouter = express.Router();

dishesRouter.post("/", DishesController.create);
dishesRouter.get("/", DishesController.findAll);
dishesRouter.get("/array/:ids", DishesController.findByArray);
dishesRouter.get("/:id", DishesController.findOne);
dishesRouter.patch("/:id", DishesController.update);
dishesRouter.delete("/:id", DishesController.remove);

export default dishesRouter;
