import { z } from "zod"
import { objectId, ParamIdSchema } from "../../../utils/generic-schema"

const UpdateDishBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  ingredients: z
    .array(
      z.object({
        id: objectId,
        quantity: z.number(),
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
