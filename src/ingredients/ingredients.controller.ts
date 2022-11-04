import { Request, Response } from "express"
import { Types } from "mongoose"
import { IngredientsService } from "./ingredients.service"

export class IngredientsController {
  public static async create(req: Request, res: Response) {
    try {
      const ingredient = await IngredientsService.create(req.body)

      res.status(201).send(ingredient)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const ingredients = await IngredientsService.findAll()

      res.send(ingredients)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAllSockType(req: Request, res: Response) {
    try {
      const ingredients = await IngredientsService.findAllSockType()

      res.send(ingredients)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const ingredient = await IngredientsService.findOne(id)

      res.send(ingredient)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const ingredient = await IngredientsService.update(id, req.body)

      res.send(ingredient)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      await IngredientsService.remove(id)

      res.send("Ingredient deleted")
    } catch (error) {
      console.log(error)
    }
  }
}
