import { z } from "zod"
import { safeNumber } from "../../../utils/generic-schema"
import { StockType } from "../ingredients.schema"

const CreateIngredientBody = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().transform((value) => value.toLowerCase()),
  stockLeft: safeNumber(),
  stockType: z.nativeEnum(StockType).optional(),
  price: safeNumber(),
})

const CreateIngredientSchema = z.object({
  body: CreateIngredientBody,
})

type CreateIngredient = z.infer<typeof CreateIngredientBody>

export type { CreateIngredient }
export { CreateIngredientSchema }
