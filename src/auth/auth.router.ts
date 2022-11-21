import { Router } from "express"
import { validate } from "../../utils/validation"
import { AuthController } from "./auth.controller"
import { LoginSchema } from "./validations/login"

const authRouter = Router()

// Login
authRouter.post("/login", validate(LoginSchema), AuthController.login)
authRouter.post("/verify", AuthController.verifyAccessToken)
authRouter.get("/refresh", AuthController.refresh)
authRouter.get("/logout", AuthController.logout)

export default authRouter
