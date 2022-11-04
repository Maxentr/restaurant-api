import { z } from "zod"
import { ParamIdSchema } from "../../../utils/generic-schema"

const UpdateDrinkBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  stockLeft: z.number().optional(),
  size: z
    .array(
      z.object({
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
      }),
    )
    .optional(),
})

const UpdateDrinkSchema = z.object({
  params: ParamIdSchema,
  body: UpdateDrinkBody,
})

type UpdateDrink = z.infer<typeof UpdateDrinkBody>

export { UpdateDrinkSchema, UpdateDrink }
