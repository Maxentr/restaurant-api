import { z } from "zod"
import { objectId, safeNumber } from "../../../utils/generic-schema"
import { MenuAsideChoice, MenuDishChoice, MenuDrinkChoice } from "./common"

const CreateMenuBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  price: safeNumber(),
  dishes: MenuDishChoice,
  asides: MenuAsideChoice,
  drinks: MenuDrinkChoice,
})

const CreateMenuSchema = z.object({
  body: CreateMenuBody,
})

type CreateMenu = z.infer<typeof CreateMenuBody>

export type { CreateMenu }
export { CreateMenuSchema }
