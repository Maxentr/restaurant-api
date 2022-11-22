import { Request, Response } from "express"
import { Types } from "mongoose"
import { DrinksService } from "../drinks/drinks.service"
import { IngredientsService } from "../ingredients/ingredients.service"
import { MenusService } from "../menus/menus.service"
import { OrderItemType } from "./orders.schema"
import { OrdersService } from "./orders.service"

export class OrdersController {
  public static async create(req: Request, res: Response) {
    try {
      const order = await OrdersService.create(req.body)

      order.items.map(async (item, index) => {
        if (item.type === OrderItemType.DRINK)
          await DrinksService.decreaseStock(
            item.drink,
            item.sizeId,
            item.quantity,
          )
        else if (item.type === OrderItemType.DISH)
          await IngredientsService.decreaseStock(item.dish, item.quantity)
        else if (item.type === OrderItemType.MENU)
          await MenusService.decreaseStock(item.menu, item.choicesId)
      })

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
