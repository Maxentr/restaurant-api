import { z } from "zod"
import { objectId, safeNumber } from "../../../utils/generic-schema"

const MenuDishChoice = z.array(
  z.object({
    dish: objectId,
    extraCost: safeNumber().optional(),
  }),
)
const MenuAsideChoice = z.array(
  z.object({
    aside: objectId,
    extraCost: safeNumber().optional(),
  }),
)
const MenuDrinkChoice = z.array(
  z.object({
    drink: objectId,
    size: objectId,
    extraCost: safeNumber().optional(),
  }),
)

export { MenuAsideChoice, MenuDishChoice, MenuDrinkChoice }
