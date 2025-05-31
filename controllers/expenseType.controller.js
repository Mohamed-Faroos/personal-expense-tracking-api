import ExpenseTypeModel from "../models/expenseType.model.js";

export const getAllExpenseTypes = async (req, res) => {
    try {
        const expenseTypes = await ExpenseTypeModel.find({});
        res.status(200).json(expenseTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
