import express from "express";
import { MenusController } from "./menus.controller";

const menusRouter = express.Router();

menusRouter.post("/", MenusController.create);
menusRouter.get("/", MenusController.findAll);
menusRouter.get("/array/:ids", MenusController.findByArray);
menusRouter.get("/:id", MenusController.findOne);
menusRouter.patch("/:id", MenusController.update);
menusRouter.delete("/:id", MenusController.remove);

export default menusRouter;
