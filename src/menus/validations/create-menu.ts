import { z } from "zod"
import { objectId } from "../../../utils/generic-schema"
import { MenuAsideChoice, MenuDishChoice, MenuDrinkChoice } from "./common"

const CreateMenuBody = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  price: z.number(),
  dishes: MenuDishChoice,
  asides: MenuAsideChoice,
  drinks: MenuDrinkChoice,
})

const CreateMenuSchema = z.object({
  body: CreateMenuBody,
})

type CreateMenu = z.infer<typeof CreateMenuBody>

export {
  CreateMenuSchema,
  CreateMenu,
}
