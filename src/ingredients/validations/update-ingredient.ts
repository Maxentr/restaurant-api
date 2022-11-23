import { z } from "zod"
import { safeNumber, ParamIdSchema } from "../../../utils/generic-schema"
import { StockType } from "../ingredients.schema"

const UpdateIngredientBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z
    .string()
    .transform((value) => value.toLowerCase())
    .optional(),
  stockLeft: safeNumber().optional(),
  stockType: z.nativeEnum(StockType).optional(),
  price: safeNumber().optional(),
})

const UpdateIngredientSchema = z.object({
  params: ParamIdSchema,
  body: UpdateIngredientBody,
})

type UpdateIngredient = z.infer<typeof UpdateIngredientBody>

export type { UpdateIngredient }
export { UpdateIngredientSchema }
