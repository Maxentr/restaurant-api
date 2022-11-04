import { z } from "zod"
import { objectId, ParamIdSchema } from "../../../utils/generic-schema"
import { StockType } from "../ingredients.schema"

// Update ingredient
const UpdateIngredientBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z
    .string()
    .transform((value) => value.toLowerCase())
    .optional(),
  stockLeft: z.number().optional(),
  stockType: z.nativeEnum(StockType).optional(),
  price: z.number().optional(),
})

const UpdateIngredientSchema = z.object({
  params: ParamIdSchema,
  body: UpdateIngredientBody,
})

type UpdateIngredient = z.infer<typeof UpdateIngredientBody>

export { UpdateIngredientSchema, UpdateIngredient }
