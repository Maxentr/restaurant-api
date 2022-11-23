import { z } from "zod"
import {
  objectId,
  ParamIdSchema,
  safeNumber,
} from "../../../utils/generic-schema"

const UpdateDishBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: safeNumber().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        ingredient: objectId,
        quantity: safeNumber(),
      }),
    )
    .optional(),
})

const UpdateDishSchema = z.object({
  params: ParamIdSchema,
  body: UpdateDishBody,
})

type UpdateDish = z.infer<typeof UpdateDishBody>

export type { UpdateDish }
export { UpdateDishSchema }
