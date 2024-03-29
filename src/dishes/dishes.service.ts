import { Types } from "mongoose"
import { IngredientsService } from "../ingredients/ingredients.service"
import { Dish } from "./dishes.schema"
import { CreateDish } from "./validations/create-dish"
import { UpdateDish } from "./validations/update-dish"

export class DishesService {
  public static async create(createRequest: CreateDish) {
    return await Dish.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    return await Dish.find().populate({ path: "ingredients.ingredient" }).exec()
  }

  public static async findAllByCategory(category: string) {
    return await Dish.find({ category }).exec()
  }

  public static async findByArray(ids: Types.ObjectId[]) {
    return await Dish.find({ _id: { $in: ids } }).exec()
  }

  public static async findOne(id: Types.ObjectId) {
    return await Dish.findById(id).exec()
  }

  public static async update(id: Types.ObjectId, updateRequest: UpdateDish) {
    return await Dish.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async decreaseStock(id: Types.ObjectId): Promise<void> {
    const dish = await Dish.findById(id).exec()
    console.log(dish)

    if (dish) {
      dish.ingredients.map(
        async ({ ingredient, quantity }) =>
          ingredient instanceof Types.ObjectId &&
          (await IngredientsService.decreaseStock(ingredient, quantity)),
      )
    }
  }

  public static async remove(id: Types.ObjectId) {
    return await Dish.findByIdAndDelete(id).exec()
  }
}
