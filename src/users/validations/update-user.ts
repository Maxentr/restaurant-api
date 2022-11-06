import { z } from "zod"
import { ParamIdSchema } from "../../../utils/generic-schema"

const UpdateUserBody = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password && password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      })
    }
  })

const UpdateUserSchema = z.object({
  params: ParamIdSchema,
  body: UpdateUserBody,
})

type UpdateUser = z.infer<typeof UpdateUserBody>

export type { UpdateUser }
export { UpdateUserSchema }
