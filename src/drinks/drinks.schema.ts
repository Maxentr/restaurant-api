import { Schema, model, Types } from "mongoose"

export type DrinkStockSize = {
  _id: Types.ObjectId
  name: string
  price: number
  quantity: number
}

export type Drink = {
  _id: Types.ObjectId
  name: string
  description: string
  image?: string
  stockLeft: number
  sizes: DrinkStockSize[]
  createdAt: Date
  updatedAt: Date
}

// Mongooose schema
// This is an equivalent of Typescript types above
const DrinkStockSizeSchema = new Schema<DrinkStockSize>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const drinksSchema = new Schema<Drink>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  stockLeft: { type: Number, required: true },
  sizes: {
    type: [DrinkStockSizeSchema],
    required: true,
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Drink = model<Drink>("drinks", drinksSchema)
