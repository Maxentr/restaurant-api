import { z } from "zod"
import { Role } from "../users.schema"

const CreateUserBody = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(Role).optional(),
})

const CreateUserSchema = z.object({
  body: CreateUserBody,
})

type CreateUser = z.infer<typeof CreateUserBody>

export { CreateUserSchema, CreateUser }
