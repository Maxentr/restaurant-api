import { Schema, model } from "mongoose"

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  name: string
  email: string
  password: string
  role?: Role
  createdAt: Date
  updatedAt: Date
}

const usersSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false, min: 8 },
  role: { type: String, enum: Role, default: Role.USER, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
})

export const User = model<User>("users", usersSchema)