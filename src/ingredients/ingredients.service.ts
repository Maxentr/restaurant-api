// import { CreateIngredientDto } from "./dto/create-ingredient.dto";
// import { UpdateIngredientDto } from "./dto/update-ingredient.dto";
import { Ingredient } from "./ingredients.schema"

export class IngredientsService {
  public static async create(createRequest: any /* CreateIngredientDto */) {
    return await Ingredient.create({
      ...createRequest,
      category: createRequest.category.toLowerCase(),
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

  public static async findOne(id: string) {
    return await Ingredient.findById(id).exec()
  }

  public static async update(
    id: string,
    updateRequest: any /* UpdateIngredientDto */,
  ) {
    return await Ingredient.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        category:
          updateRequest.category && updateRequest.category.toLowerCase(),
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async remove(id: string) {
    return await Ingredient.findByIdAndDelete(id).exec()
  }
}
