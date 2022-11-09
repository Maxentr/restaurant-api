import { z } from "zod"

const CreateDrinkBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  stockLeft: z.number(),
  sizes: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
    }),
  ),
})

const CreateDrinkSchema = z.object({
  body: CreateDrinkBody,
})

type CreateDrink = z.infer<typeof CreateDrinkBody>

export type { CreateDrink }
export { CreateDrinkSchema }
