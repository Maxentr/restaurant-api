// Require Mongoose
import { Schema, model } from "mongoose";

export enum StockType {
  LITERS = "LITERS",
  KILOGRAMS = "KILOGRAMS",
  UNITS = "UNITS",
}

export type Ingredient = {
  name: string;
  description?: string;
  category: string; // Potential future id of categories collection
  stockLeft: number;
  stockType?: StockType;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

const ingredientsSchema = new Schema<Ingredient>({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  stockLeft: { type: Number, required: true },
  stockType: { type: String, enum: StockType, default: StockType.UNITS, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

export const Ingredient = model<Ingredient>("ingredients", ingredientsSchema);
