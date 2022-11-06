import { z } from "zod"
import { objectId } from "../../../utils/generic-schema"
import { OrderItemType } from "../orders.schema"

const OrderItemSchema = z.object({
  item: objectId,
  type: z.nativeEnum(OrderItemType),
  quantity: z.number(),
  totalPrice: z.number(),
  elementsId: z.array(objectId).optional(),
})

const CreateOrderBody = z.object({
  customer: objectId,
  order: z.array(OrderItemSchema),
  total: z.number(),
})

const CreateOrderSchema = z.object({
  body: CreateOrderBody,
})

type CreateOrder = z.infer<typeof CreateOrderBody>

export type { CreateOrder }
export { CreateOrderSchema }
