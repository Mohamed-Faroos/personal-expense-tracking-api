import mongoose, { Schema } from "mongoose";

const ExpenseTypeSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    label: { type: String, required: true },
    name: { type: String, unique:true, required: true }
})

const ExpenseTypeModel = mongoose.model("ExpenseType", ExpenseTypeSchema)
export default ExpenseTypeModel;