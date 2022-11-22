import { z } from "zod"
import { objectId } from "../../../utils/generic-schema"
import { OrderItemType } from "../orders.schema"

const OrderItemDefaultSchema = {
  type: z.nativeEnum(OrderItemType),
  quantity: z.number(),
  totalPrice: z.number(),
}

const OrderItemMenuSchema = z.object({
  ...OrderItemDefaultSchema,
  menu: objectId,
  choicesId: z.array(objectId),
})

const OrderItemDishSchema = z.object({
  ...OrderItemDefaultSchema,
  dish: objectId,
})

const OrderItemDrinkSchema = z.object({
  ...OrderItemDefaultSchema,
  drink: objectId,
  sizeId: objectId,
})

const CreateOrderBody = z.object({
  customer: objectId,
  items: z.array(
    OrderItemMenuSchema || OrderItemDishSchema || OrderItemDrinkSchema,
  ),
  total: z.number(),
})

const CreateOrderSchema = z.object({
  body: CreateOrderBody,
})

type CreateOrder = z.infer<typeof CreateOrderBody>

export type { CreateOrder }
export { CreateOrderSchema }
