import { server } from "./src/server"
import { Router } from "express"

import ingredientsRouter from "./src/ingredients/ingredients.router"
import dishesRouter from "./src/dishes/dishes.router"
import drinksRouter from "./src/drinks/drinks.router"
import menusRouter from "./src/menus/menus.router"
import usersRouter from "./src/users/users.router"

server.start()
const app = server.app
const api = Router()

// Routes V1
const routerV1 = Router()

routerV1.use("/ingredients", ingredientsRouter)
routerV1.use("/dishes", dishesRouter)
routerV1.use("/drinks", drinksRouter)
routerV1.use("/menus", menusRouter)
routerV1.use("/users", usersRouter)

// Add versionning to api routes
api.use("/v1", routerV1)
// Add "api" prefix to app
app.use("/api", api)
