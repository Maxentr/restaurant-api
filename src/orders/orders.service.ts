import { Types } from "mongoose"
import { Order } from "./orders.schema"
import { CreateOrder } from "./validations/create-order"

export class OrdersService {
  public static async create(createRequest: CreateOrder) {
    return await Order.create({
      ...createRequest,
      createdAt: new Date(),
    })
  }

  public static async findAll() {
    return await Order.find().exec()
  }

  public static async findByCustomer(id: Types.ObjectId) {
    return await Order.find({ customer: id }).exec()
  }

  public static async findOne(id: Types.ObjectId) {
    return await Order.findById(id).exec()
  }
}
