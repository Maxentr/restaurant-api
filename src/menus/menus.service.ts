import { Dish } from "../dishes/dishes.schema";
import { Drink } from "../drinks/drinks.schema";
import { Menu } from "./menus.schema";
// import { CreateMenuDto } from "./dto/create-menu.dto";
// import { UpdateMenuDto } from "./dto/update-menu.dto";

export class MenusService {
  public static async create(createRequest: any /* CreateMenuDto */) {
    return await Menu.create({
      ...createRequest,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static async findAll() {
    const menus = await Menu.find()
      .populate("dishes.dish")
      .populate("asides.aside")
      .populate("drinks.drink")
      .exec();
    console.log(menus[0].dishes);
    return menus;
  }

  public static async findByArray(ids: string[]) {
    return await Menu.find({ _id: { $in: ids } })
    .populate("dishes.dish")
    .populate("asides.aside")
    .populate("drinks.drink")
      .exec();
  }

  public static async findOne(id: string) {
    return await Menu.findById(id).exec();
  }

  public static async update(id: string, updateRequest: any /* UpdateMenuDto */) {
    return await Menu.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec();
  }

  public static async remove(id: string) {
    return await Menu.findByIdAndDelete(id).exec();
  }
}
