import { Schema, model, Types } from "mongoose"
import { Ingredient } from "../ingredients/ingredients.schema"

export type DishIngredient = {
  _id: Types.ObjectId
  id: Types.ObjectId
  quantity: number
}

export type Dish = {
  _id: Types.ObjectId
  name: string
  description: string
  price: number
  image?: string
  category?: string
  ingredients: DishIngredient[]
  createdAt: Date
  updatedAt: Date
}

// Mongooose schema
// This is an equivalent of Typescript types above
const DishIngredientSchema = new Schema<DishIngredient>({
  id: { type: Schema.Types.ObjectId, ref: Ingredient, required: true },
  quantity: { type: Number, required: true },
})

const dishesSchema = new Schema<Dish>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  category: String,
  ingredients: { type: [DishIngredientSchema], required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Dish = model<Dish>("dishes", dishesSchema)
