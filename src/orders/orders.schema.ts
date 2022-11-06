import { Schema, model, Types } from "mongoose"
import { User } from "../users/users.schema"

export enum OrderItemType {
  MENU = "MENU",
  DRINK = "DRINK",
  DISH = "DISH",
}

export type OrderItem = {
  _id: Types.ObjectId
  item: Types.ObjectId
  type: OrderItemType
  quantity: number
  totalPrice: number
  elementsId?: Types.ObjectId[]
}

export type Order = {
  _id: Types.ObjectId
  customer: Types.ObjectId | User
  order: OrderItem[]
  total: number
  createdAt: Date
}

const ordersSchema = new Schema<Order>({
  customer: { type: Types.ObjectId, ref: User, required: true },
  order: [
    {
      item: { type: Types.ObjectId, required: true },
      type: { type: String, enum: OrderItemType, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      elementsId: { type: [Types.ObjectId], required: false },
    },
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const Order = model<Order>("orders", ordersSchema)