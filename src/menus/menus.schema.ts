import { Schema, model, Types } from "mongoose";
import { Dish } from "../dishes/dishes.schema";
import { Drink } from "../drinks/drinks.schema";

export type MenuDrinkChoice = {
  size: Types.ObjectId;
  extraCost?: number;
} & { [k: string]: Types.ObjectId };

export type MenuDishChoice = {
  extraCost?: number;
} & { [k: string]: Types.ObjectId };

export type Menu = {
  name: string;
  description: string;
  image?: string;
  price: number;
  dishes: MenuDishChoice[];
  asides: MenuDishChoice[];
  drinks: MenuDrinkChoice[];
  createdAt: Date;
  updatedAt: Date;
};

const menusSchema = new Schema<Menu>({
  name: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true },
  dishes: [{ dish: { type: Types.ObjectId, ref: Dish, required: true }, extraCost: Number }],
  asides: [{ aside: { type: Types.ObjectId, ref: Dish, required: true }, extraCost: Number }],
  drinks: [
    {
      drink: { type: Types.ObjectId, ref: Drink, required: true },
      size: { type: Types.ObjectId, required: true },
      extraCost: Number,
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const Menu = model<Menu>("menus", menusSchema);
