// import { CreateDishDto } from "./dto/create-dishes.dto";
// import { UpdateDishDto } from "./dto/update-dishes.dto";
import { Types } from "mongoose"
import { Dish } from "./dishes.schema"

export class DishesService {
  public static async create(createRequest: any /*CreateDishDto*/) {
    return await Dish.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    return await Dish.find().exec()
  }

  public static async findByArray(ids: string[]) {
    return await Dish.find({ _id: { $in: ids } }).exec()
  }

  public static async findOne(id: string) {
    return await Dish.findById(id).exec()
  }

  public static async update(id: string, updateRequest: any /*UpdateDishDto*/) {
    return await Dish.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async remove(id: string) {
    return await Dish.findByIdAndDelete(id).exec()
  }
}
