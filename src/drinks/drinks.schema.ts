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
  size: DrinkStockSize[]
  createdAt: Date
  updatedAt: Date
}

const drinksSchema = new Schema<Drink>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  image: String,
  stockLeft: { type: Number, required: false },
  size: {
    type: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const Drink = model<Drink>("drinks", drinksSchema)
