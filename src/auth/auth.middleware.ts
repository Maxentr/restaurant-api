import { NextFunction, Request, Response } from "express"
import { Role } from "../users/users.schema"
import { AuthService } from "./auth.service"

type RoleString = keyof typeof Role
const AuthMiddleware = (...roleRestriction: RoleString[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.status(401).send({ message: "No token provided" })

    try {
      const token = authHeader.split(" ")[1]
      const decodedToken = AuthService.verifyAccessToken(token)

      if (roleRestriction.includes(decodedToken.role)) {
        next()
      } else {
        res.status(403).send({ message: "Forbidden" })
      }
    } catch (error) {
      res.status(403).send({ message: "Invalid token" })
    }
  }
}

export default AuthMiddleware
