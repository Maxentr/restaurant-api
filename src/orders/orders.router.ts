import { Router } from "express"
import { RouteIdSchema, RouteIdsSchema } from "../../utils/generic-schema"
import { validate } from "../../utils/validation"
import { OrdersController } from "./orders.controller"
import { CreateOrderSchema } from "./validations/create-order"

const ordersRouter = Router()

// Create
ordersRouter.post("/", validate(CreateOrderSchema), OrdersController.create)

// Read all
ordersRouter.get("/", OrdersController.findAll)
ordersRouter.get(
  "/customer/:id",
  validate(RouteIdSchema),
  OrdersController.findByCustomer,
)

// Read one
ordersRouter.get("/:id", validate(RouteIdSchema), OrdersController.findOne)

export default ordersRouter
