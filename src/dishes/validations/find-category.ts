import { z } from "zod"

const findAllByCategoryParams = z.object({
  category: z.string(),
})

const findAllByCategorySchema = z.object({
  params: findAllByCategoryParams,
})

export { findAllByCategorySchema }
