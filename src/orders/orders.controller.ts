import { Request, Response } from "express"
import { Types } from "mongoose"
import { OrdersService } from "./orders.service"

export class OrdersController {
  public static async create(req: Request, res: Response) {
    try {
      const order = await OrdersService.create(req.body)

      res.status(201).send(order)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findAll(req: Request, res: Response) {
    try {
      const orders = await OrdersService.findAll()

      res.send(orders)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findByCustomer(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const orders = await OrdersService.findByCustomer(id)

      res.send(orders)
    } catch (error) {
      console.log(error)
    }
  }

  public static async findOne(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id)
      const order = await OrdersService.findOne(id)

      res.send(order)
    } catch (error) {
      console.log(error)
    }
  }
}
