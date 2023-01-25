import express from "express"
import { Router } from "express"

import ingredientsRouter from "./ingredients/ingredients.router"
import dishesRouter from "./dishes/dishes.router"
import drinksRouter from "./drinks/drinks.router"
import menusRouter from "./menus/menus.router"
import usersRouter from "./users/users.router"
import authRouter from "./auth/auth.router"
import ordersRouter from "./orders/orders.router"
import swaggerUi from "swagger-ui-express"
import { createRateLimiter } from "../utils/rateLimit"
import YAML from "yamljs"

export const createRouter = (app: express.Express, redis: any) => {
  // Only in development
  if (process.env.NODE_ENV !== "production") {
    // Put Swagger at the root of the API
    app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(YAML.load("./swagger.yaml")),
    )
  }

  // Add a rate limiter to the API if it's in production
  if (process.env.NODE_ENV === "production")
    app.use(
      createRateLimiter(
        process.env.RATE_LIMIT_WINDOW_MS,
        process.env.RATE_LIMIT_MAX_REQUEST,
        redis,
      ),
    )

  // Routes V1
  const routerV1 = Router()

  // Put rate limiter before auth routes if it's in production
  if (process.env.NODE_ENV === "production") {
    routerV1.use(
      "/auth",
      createRateLimiter(
        process.env.RATE_LIMIT_AUTH_WINDOW_MS,
        process.env.RATE_LIMIT_AUTH_MAX_REQUEST,
        redis,
      ),
      authRouter,
    )
  } else {
    routerV1.use("/auth", authRouter)
  }
  routerV1.use("/ingredients", ingredientsRouter)
  routerV1.use("/dishes", dishesRouter)
  routerV1.use("/drinks", drinksRouter)
  routerV1.use("/menus", menusRouter)
  routerV1.use("/users", usersRouter)
  routerV1.use("/orders", ordersRouter)

  // nest all routes under /api
  const api = Router()

  // Add versionning to api routes
  api.use("/v1", routerV1)
  // Get ip address of the client (for rate limiting proxies)
  api.use("/ip", (request, response) => response.send(request.ip))
  // Add "api" prefix to app

  app.use("/api", api)
}
