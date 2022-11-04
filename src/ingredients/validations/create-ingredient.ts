import { z } from "zod"
import { StockType } from "../ingredients.schema"

// Create ingredient
const CreateIngredientBody = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().transform((value) => value.toLowerCase()),
  stockLeft: z.number(),
  stockType: z.nativeEnum(StockType).optional(),
  price: z.number(),
})

const CreateIngredientSchema = z.object({
  body: CreateIngredientBody,
})

type CreateIngredient = z.infer<typeof CreateIngredientBody>

export { CreateIngredientSchema, CreateIngredient }
