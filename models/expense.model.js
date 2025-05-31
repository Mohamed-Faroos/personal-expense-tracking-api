import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    expenseType: { type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseType', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now }
})

const ExpenseModel = mongoose.model("Expense", ExpenseSchema)
export default ExpenseModel;