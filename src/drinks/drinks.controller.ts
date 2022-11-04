import { Request, Response } from "express"
import { Types } from "mongoose"
import { DrinksService } from "./drinks.service"

export class DrinksController {
  //

  public static async create(req: Request, res: Response) {
    try {
      const drink = await DrinksService.create(req.body)

      res.status(201).send(drink)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const drinks = await DrinksService.findAll()

      res.send(drinks)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findByArray(req: Request, res: Response) {
    try {
      const ids: Types.ObjectId[] = req.params.ids
        .split(",")
        .map((id) => new Types.ObjectId(req.params.id))
      const drinks = await DrinksService.findByArray(ids)
      console.log(drinks)
      res.send(drinks)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const drink = await DrinksService.findOne(id)

      res.send(drink)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const drink = await DrinksService.update(id, req.body)

      res.send(drink)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      await DrinksService.remove(id)

      res.send("Drink deleted")
    } catch (error) {
      console.log(error)
    }
  }
}
