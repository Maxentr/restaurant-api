import { Drink } from "./drinks.schema";
// import { CreateDrinkDto } from "./dto/create-drink.dto";
// import { UpdateDrinkDto } from "./dto/update-drink.dto";

export class DrinksService {
  public static async create(createRequest: any /* CreateDrinkDto */) {
    return await Drink.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static async findAll() {
    return await Drink.find().exec();
  }

  public static async findByArray(ids: string[]) {
    return await Drink.find({ _id: { $in: ids } }).exec();
  }

  public static async findOne(id: string) {
    return await Drink.findById(id).exec();
  }

  public static async update(id: string, updateRequest: any /* UpdateDrinkDto */) {
    return await Drink.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec();
  }

  public static async remove(id: string) {
    return await Drink.findByIdAndDelete(id).exec();
  }
}
