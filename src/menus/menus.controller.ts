import { Request, Response } from "express"
import { Types } from "mongoose"
import { MenusService } from "./menus.service"

export class MenusController {
  public static async create(req: Request, res: Response) {
    try {
      // validate(req.body, { skipMissingProperties: true });

      const menu = await MenusService.create(req.body)

      res.status(201).send(menu)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const menus = await MenusService.findAll()

      res.send(menus)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findByArray(req: Request, res: Response) {
    try {
      const ids: Types.ObjectId[] = req.params.ids
        .split(",")
        .map((id) => new Types.ObjectId(id))
      const dishes = await MenusService.findByArray(ids)

      res.send(dishes)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const menu = await MenusService.findOne(id)

      res.send(menu)
    } catch (error) {
      console.log(error)
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const menu = await MenusService.update(id, req.body)

      res.send(menu)
    } catch (error) {
      console.log(error)
    }
  }

  public static async remove(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      await MenusService.remove(id)

      res.send("Menu deleted")
    } catch (error) {
      console.log(error)
    }
  }
}
