import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: [{ type: String }],
  attendance: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
