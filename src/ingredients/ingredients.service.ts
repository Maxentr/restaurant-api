import { CreateIngredient } from "./validations/create-ingredient"
import { UpdateIngredient } from "./validations/update-ingredient"
import { Ingredient } from "./ingredients.schema"
import { Types } from "mongoose"

export class IngredientsService {
  public static async create(createRequest: CreateIngredient) {
    return await Ingredient.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    return await Ingredient.find().exec()
  }

  public static async findAllSockType() {
    return await Ingredient.distinct("stockType").exec()
  }

  public static async findOne(id: Types.ObjectId) {
    return await Ingredient.findById(id).exec()
  }

  public static async update(
    id: Types.ObjectId,
    updateRequest: UpdateIngredient,
  ) {
    return await Ingredient.findByIdAndUpdate(
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
    quantity: number,
  ): Promise<void> {
    await Ingredient.findByIdAndUpdate(id, {
      $inc: {
        stockLeft: -quantity,
      },
    }).exec()
  }

  public static async remove(id: Types.ObjectId) {
    return await Ingredient.findByIdAndDelete(id).exec()
  }
}
