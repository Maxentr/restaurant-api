import { validate } from "class-validator";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { DishesService } from "./dishes.service";

export class DishesController {
  //

  public static async create(req: Request, res: Response) {
    try {
      // validate(req.body, { skipMissingProperties: true });

      const dish = await DishesService.create(req.body);

      res.status(201).send(dish);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const dishes = await DishesService.findAll();

      res.send(dishes);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findByArray(req: Request, res: Response) {
    try {
      const ids: string[] = req.params.ids.split(",");
      const dishes = await DishesService.findByArray(ids);

      res.send(dishes);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const dish = await DishesService.findOne(req.params.id);

      res.send(dish);
    } catch (error) {
      console.log(error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      validate(req.body, { skipMissingProperties: true });

      const dish = await DishesService.update(req.params.id, req.body);

      res.send(dish);
    } catch (error) {
      console.log(error);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      await DishesService.remove(req.params.id);

      res.send("Dish deleted");
    } catch (error) {
      console.log(error);
    }
  }
}
