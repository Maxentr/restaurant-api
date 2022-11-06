import { Schema, model, Types } from "mongoose"

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export type User = {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

// Mongooose schema
// This is an equivalent of Typescript types above
const usersSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false, min: 8 },
  role: { type: String, enum: Role, default: Role.CUSTOMER, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const User = model<User>("users", usersSchema)
