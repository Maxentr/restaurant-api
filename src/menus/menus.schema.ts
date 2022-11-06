import { Schema, model, Types } from "mongoose"
import { Dish } from "../dishes/dishes.schema"
import { Drink } from "../drinks/drinks.schema"

type MenuChoice = {
  _id: Types.ObjectId
  extraCost?: number
}

export type MenuDrinkChoice = MenuChoice & {
  drink: Types.ObjectId
  size: Types.ObjectId
}

export type MenuDishChoice = MenuChoice & {
  dish: Types.ObjectId
}

export type MenuAsideChoice = MenuChoice & {
  aside: Types.ObjectId
}

export type Menu = {
  _id: Types.ObjectId
  name: string
  description: string
  image?: string
  price: number
  dishes: MenuDishChoice[]
  asides: MenuAsideChoice[]
  drinks: MenuDrinkChoice[]
  createdAt: Date
  updatedAt: Date
}

// Mongooose schema
// This is an equivalent of Typescript types above
const MenuChoiceSchema = new Schema<MenuChoice>({
  extraCost: { type: Number, required: false },
})
const MenuDrinkChoiceSchema = new Schema<MenuDrinkChoice>({
  drink: { type: Schema.Types.ObjectId, ref: Drink, required: true },
  size: { type: Schema.Types.ObjectId, required: true },
  extraCost: MenuChoiceSchema,
})
const MenuDishChoiceSchema = new Schema<MenuDishChoice>({
  dish: { type: Schema.Types.ObjectId, ref: Dish, required: true },
  extraCost: MenuChoiceSchema,
})
const MenuAsideChoiceSchema = new Schema<MenuAsideChoice>({
  aside: { type: Schema.Types.ObjectId, ref: Dish, required: true },
  extraCost: MenuChoiceSchema,
})

const menusSchema = new Schema<Menu>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  dishes: {
    type: [MenuDishChoiceSchema],
    required: true,
  },
  asides: {
    type: [MenuAsideChoiceSchema],
    required: true,
  },
  drinks: {
    type: [MenuDrinkChoiceSchema],
    required: true,
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Menu = model<Menu>("menus", menusSchema)
