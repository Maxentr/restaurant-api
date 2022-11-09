import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import Auth from "../auth/auth.middleware"
import UserIntegrity from "../users/users.middleware"
import { OrdersController } from "./orders.controller"
import { CreateOrderSchema } from "./validations/create-order"

const ordersRouter = Router()

// Create
ordersRouter.post("/", validate(CreateOrderSchema), UserIntegrity("customer", "body"), OrdersController.create)

// Read all
ordersRouter.get("/", Auth("ADMIN"), OrdersController.findAll)
ordersRouter.get(
  "/customer/:id",
  validate(RouteIdSchema),
  UserIntegrity("id", "params"),
  OrdersController.findByCustomer,
)

// Read one
ordersRouter.get("/:id", Auth("CUSTOMER", "ADMIN"), validate(RouteIdSchema), OrdersController.findOne)

export default ordersRouter
