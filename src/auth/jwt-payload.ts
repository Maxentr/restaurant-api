import { Types } from "mongoose"
import { Role, User } from "../users/users.schema"

export type JwtPayload = {
  id: Types.ObjectId
  name: string
  email: string
  role: Role
}

const createJwtPayload = (user: User): JwtPayload => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export { createJwtPayload }
export default createJwtPayload
