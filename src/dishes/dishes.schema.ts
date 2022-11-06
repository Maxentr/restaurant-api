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

const dishesSchema = new Schema<Dish>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  ingredients: [
    {
      id: { type: Types.ObjectId, ref: Ingredient, required: true },
      quantity: Number,
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Dish = model<Dish>("dishes", dishesSchema)
