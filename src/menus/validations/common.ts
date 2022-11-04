import { z } from "zod"
import { objectId } from "../../../utils/generic-schema"

const MenuDishChoice = z.array(
  z.object({
    dish: objectId,
    extraCost: z.number().optional(),
  }),
)
const MenuAsideChoice = z.array(
  z.object({
    aside: objectId,
    extraCost: z.number().optional(),
  }),
)
const MenuDrinkChoice = z.array(
  z.object({
    drink: objectId,
    size: objectId,
    extraCost: z.number().optional(),
  }),
)

export { MenuAsideChoice, MenuDishChoice, MenuDrinkChoice }
