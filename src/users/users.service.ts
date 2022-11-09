import { Types } from "mongoose"
import { User } from "./users.schema"
import { CreateUser } from "./validations/create-user"
import { UpdateUser } from "./validations/update-user"
import { hash } from "bcrypt"

export class UsersService {
  public static async create(createRequest: CreateUser) {
    return await User.create({
      ...createRequest,
      password: await hash(
        createRequest.password,
        +(process.env.SALT_ROUNDS || 10),
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  public static async findAll() {
    const menus = await User.find().exec()
    return menus
  }

  public static async findOne(id: Types.ObjectId) {
    return await User.findById(id).exec()
  }

  // Use only for authentification method
  public static async findOneAuthentification(email: string) {
    return await User.findOne({ email })
      .select(["name", "email", "password", "role"])
      .exec()
  }

  public static async isEmailTaken(email: string) {
    return await User.exists({ email }).exec()
  }

  public static async update(id: Types.ObjectId, updateRequest: UpdateUser) {
    if (updateRequest.password) {
      updateRequest.password = await hash(
        updateRequest.password,
        +(process.env.SALT_ROUNDS || 10),
      )
      updateRequest.confirmPassword = undefined
    }

    return await User.findByIdAndUpdate(
      id,
      {
        ...updateRequest,
        updatedAt: new Date(),
      },
      { new: true },
    ).exec()
  }

  public static async remove(id: Types.ObjectId) {
    return await User.findByIdAndDelete(id).exec()
  }
}
