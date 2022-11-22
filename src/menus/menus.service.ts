import { Types } from "mongoose"
import { DishesService } from "../dishes/dishes.service"
import { DrinksService } from "../drinks/drinks.service"
import { Menu } from "./menus.schema"
import { CreateMenu } from "./validations/create-menu"
import { UpdateMenu } from "./validations/update-menu"

export class MenusService {
  public static async create(createRequest: CreateMenu) {
    return await Menu.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    const menus = await Menu.find()
      .populate("dishes.dish")
      .populate("asides.aside")
      .populate("drinks.drink")
      .exec()
    return menus
  }

  public static async findByArray(ids: Types.ObjectId[]) {
    return await Menu.find({ _id: { $in: ids } })
      .populate("dishes.dish")
      .populate("asides.aside")
      .populate("drinks.drink")
      .exec()
  }

  public static async findOne(id: Types.ObjectId) {
    return await Menu.findById(id).exec()
  }

  public static async update(id: Types.ObjectId, updateRequest: UpdateMenu) {
    return await Menu.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async decreaseStock(
    id: Types.ObjectId,
    choicesId: Types.ObjectId[],
  ): Promise<void> {
    const menu = await Menu.findById(id).exec()

    // Decrease stock of dishes selected in the menu
    menu?.dishes.map(async ({ dish }) => {
      if (choicesId.includes(dish)) {
        await DishesService.decreaseStock(dish)
      }
    })

    // Decrease stock of asides selected in the menu
    menu?.asides.map(async ({ aside }) => {
      if (choicesId.includes(aside)) {
        await DishesService.decreaseStock(aside)
      }
    })

    // Decrease stock of drinks selected in the menu
    menu?.drinks.map(async ({ drink, size }) => {
      if (choicesId.includes(drink)) {
        await DrinksService.decreaseStock(drink, size)
      }
    })
  }

  public static async remove(id: Types.ObjectId) {
    return await Menu.findByIdAndDelete(id).exec()
  }
}
