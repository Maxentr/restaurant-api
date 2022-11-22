import { Schema, model, Types } from "mongoose"
import { Dish } from "../dishes/dishes.schema"
import { Drink } from "../drinks/drinks.schema"
import { Menu } from "../menus/menus.schema"
import { User } from "../users/users.schema"

export enum OrderItemType {
  MENU = "MENU",
  DRINK = "DRINK",
  DISH = "DISH",
}

type OrderItemDefault = {
  _id: Types.ObjectId
  type: OrderItemType
  quantity: number
  totalPrice: number
}

export type OrderItemMenu = OrderItemDefault & {
  menu: Types.ObjectId
  type: OrderItemType.MENU
  choicesId: Types.ObjectId[]
}

export type OrderItemDish = OrderItemDefault & {
  dish: Types.ObjectId
  type: OrderItemType.DISH
}

export type OrderItemDrink = OrderItemDefault & {
  drink: Types.ObjectId
  type: OrderItemType.DRINK
  sizeId: Types.ObjectId
}

export type OrderItem = OrderItemMenu | OrderItemDish | OrderItemDrink

export type Order = {
  _id: Types.ObjectId
  customer: Types.ObjectId
  items: OrderItem[]
  total: number
  createdAt: Date
}

// Mongooose schema
// This is an equivalent of Typescript types above

const OrderItemDefaultSchema = {
  type: { type: String, enum: OrderItemType, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
}

const orderItemMenuSchema = new Schema<OrderItemMenu>({
  ...OrderItemDefaultSchema,
  menu: { type: Schema.Types.ObjectId, ref: Menu, required: true },
  choicesId: { type: [Schema.Types.ObjectId], required: true },
})

const orderItemDishSchema = new Schema<OrderItemDish>({
  ...OrderItemDefaultSchema,
  dish: { type: Schema.Types.ObjectId, ref: Dish, required: true },
})

const orderItemDrinkSchema = new Schema<OrderItemDrink>({
  ...OrderItemDefaultSchema,
  drink: { type: Schema.Types.ObjectId, ref: Drink, required: true },
  sizeId: { type: Schema.Types.ObjectId, required: true },
})

const ordersSchema = new Schema<Order>({
  customer: { type: Schema.Types.ObjectId, ref: User, required: true },
  items: {
    type: [orderItemMenuSchema || orderItemDishSchema || orderItemDrinkSchema],
    required: true,
  },
  total: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

export const Order = model<Order>("orders", ordersSchema)
