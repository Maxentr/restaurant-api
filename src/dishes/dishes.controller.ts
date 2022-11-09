import { Request, Response } from "express"
import { Types } from "mongoose"
import { DishesService } from "./dishes.service"

export class DishesController {
  //

  public static async create(req: Request, res: Response) {
    try {
      const dish = await DishesService.create(req.body)

      res.status(201).send(dish)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const dishes = await DishesService.findAll()

      res.send(dishes)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findByArray(req: Request, res: Response) {
    try {
      const ids: Types.ObjectId[] = req.body.ids

      const dishes = await DishesService.findByArray(ids)

      res.send(dishes)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const dish = await DishesService.findOne(id)

      res.send(dish)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const dish = await DishesService.update(id, req.body)

      res.send(dish)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      await DishesService.remove(id)

      res.send("Dish deleted")
    } catch (error) {
      console.log(error)
    }
  }
}
