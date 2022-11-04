import { z } from "zod"
import { objectId } from "../../../utils/generic-schema"

const CreateDishBody = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string().optional(),
  category: z.string().optional(),
  ingredients: z.array(
    z.object({
      id: objectId,
      quantity: z.number(),
    }),
  ),
})

const CreateDishSchema = z.object({
  body: CreateDishBody,
})

type CreateDish = z.infer<typeof CreateDishBody>

export { CreateDishSchema, CreateDish }
