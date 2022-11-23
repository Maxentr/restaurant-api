import { Types } from "mongoose"
import { z } from "zod"

// MongoDB ObjectId validation
const objectId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid id",
})

const safeNumber = () =>
  z.preprocess(
    (a) => (typeof a === "number" ? a : parseInt(z.string().parse(a), 10)),
    z.number(),
  )

const ParamIdSchema = z.object({
  id: objectId,
})

const RouteIdSchema = z.object({
  params: ParamIdSchema,
})

const BodyIdsSchema = z.object({
  ids: z.array(objectId),
})

const RouteIdsSchema = z.object({
  body: BodyIdsSchema,
})

export {
  objectId,
  safeNumber,
  ParamIdSchema,
  RouteIdSchema,
  BodyIdsSchema,
  RouteIdsSchema,
}
