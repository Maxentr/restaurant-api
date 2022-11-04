import { Types } from "mongoose"
import { Drink } from "./drinks.schema"
import { CreateDrink } from "./validations/create-drink"
import { UpdateDrink } from "./validations/update-drink"
// import { CreateDrinkDto } from "./dto/create-drink.dto";
// import { UpdateDrinkDto } from "./dto/update-drink.dto";

export class DrinksService {
  public static async create(createRequest: CreateDrink) {
    return await Drink.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    return await Drink.find().exec()
  }

  public static async findByArray(ids: Types.ObjectId[]) {
    return await Drink.find({ _id: { $in: ids } }).exec()
  }

  public static async findOne(id: Types.ObjectId) {
    return await Drink.findById(id).exec()
  }

  public static async update(id: Types.ObjectId, updateRequest: UpdateDrink) {
    return await Drink.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async remove(id: Types.ObjectId) {
    return await Drink.findByIdAndDelete(id).exec()
  }
}
