import { z } from "zod"
import { safeNumber } from "../../../utils/generic-schema"

const CreateDrinkBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  stockLeft: safeNumber(),
  sizes: z.array(
    z.object({
      name: z.string(),
      price: safeNumber(),
      quantity: safeNumber(),
    }),
  ),
})

const CreateDrinkSchema = z.object({
  body: CreateDrinkBody,
})

type CreateDrink = z.infer<typeof CreateDrinkBody>

export type { CreateDrink }
export { CreateDrinkSchema }
