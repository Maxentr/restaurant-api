import { Request, Response } from "express";
import { DrinksService } from "./drinks.service";

export class DrinksController {
  //

  public static async create(req: Request, res: Response) {
    try {
      // validate(req.body, { skipMissingProperties: true });

      const drink = await DrinksService.create(req.body);

      res.status(201).send(drink);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const drinks = await DrinksService.findAll();

      res.send(drinks);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findByArray(req: Request, res: Response) {
    try {
      const ids: string[] = req.params.ids.split(",");
      const drinks = await DrinksService.findByArray(ids);
      console.log(drinks);
      res.send(drinks);
    } catch (error) {
      console.log(error);
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const drink = await DrinksService.findOne(req.params.id);

      res.send(drink);
    } catch (error) {
      console.log(error);
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      // validate(req.body, { skipMissingProperties: true });

      const drink = await DrinksService.update(req.params.id, req.body);

      res.send(drink);
    } catch (error) {
      console.log(error);
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      await DrinksService.remove(req.params.id);

      res.send("Drink deleted");
    } catch (error) {
      console.log(error);
    }
  }
}
