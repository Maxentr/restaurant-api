import { z } from "zod"
import { objectId, safeNumber } from "../../../utils/generic-schema"

const CreateDishBody = z.object({
  name: z.string(),
  description: z.string(),
  price: safeNumber(),
  image: z.string().optional(),
  category: z.string().optional(),
  ingredients: z.array(
    z.object({
      id: objectId,
      quantity: safeNumber(),
    }),
  ),
})

const CreateDishSchema = z.object({
  body: CreateDishBody,
})

type CreateDish = z.infer<typeof CreateDishBody>

export type { CreateDish }
export { CreateDishSchema }
