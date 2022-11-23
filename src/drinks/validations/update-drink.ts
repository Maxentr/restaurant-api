import { z } from "zod"
import { ParamIdSchema, safeNumber } from "../../../utils/generic-schema"

const UpdateDrinkBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  stockLeft: safeNumber().optional(),
  sizes: z
    .array(
      z.object({
        name: z.string(),
        price: safeNumber(),
        quantity: safeNumber(),
      }),
    )
    .optional(),
})

const UpdateDrinkSchema = z.object({
  params: ParamIdSchema,
  body: UpdateDrinkBody,
})

type UpdateDrink = z.infer<typeof UpdateDrinkBody>

export type { UpdateDrink }
export { UpdateDrinkSchema }
