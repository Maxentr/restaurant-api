import { z } from "zod"
import { ParamIdSchema, safeNumber } from "../../../utils/generic-schema"
import { MenuAsideChoice, MenuDishChoice, MenuDrinkChoice } from "./common"

const UpdateMenuBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: safeNumber().optional(),
  dishes: MenuDishChoice.optional(),
  asides: MenuAsideChoice.optional(),
  drinks: MenuDrinkChoice.optional(),
})

const UpdateMenuSchema = z.object({
  params: ParamIdSchema,
  body: UpdateMenuBody,
})

type UpdateMenu = z.infer<typeof UpdateMenuBody>

export type { UpdateMenu }
export { UpdateMenuSchema }
