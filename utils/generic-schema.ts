import { Types } from "mongoose"
import { z } from "zod"

// MongoDB ObjectId validation
const objectId = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid id",
})

const ParamIdSchema = z.object({
  id: objectId,
})

const RouteIdSchema = z.object({
  params: ParamIdSchema,
})

const ParamIdsSchema = z.object({
  id: z.array(objectId),
})

const RouteIdsSchema = z.object({
  params: ParamIdsSchema,
})

export {
  objectId,
  ParamIdSchema,
  RouteIdSchema,
  ParamIdsSchema,
  RouteIdsSchema,
}
