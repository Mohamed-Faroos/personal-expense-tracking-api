import express from 'express';
import { authMiddleware } from '../middleware';
import { addExpense, deleteExpense, editExpense, filterExpenses, getExpenseSummaries } from '../controllers/expense.controller';

const ExpenseRouter = express.Router();

/* route for user expense api */
ExpenseRouter.post("/add", authMiddleware, addExpense);
ExpenseRouter.put("/edit/:id", authMiddleware, editExpense);
ExpenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
ExpenseRouter.get("/stats", authMiddleware, getExpenseSummaries);
ExpenseRouter.post("/filter", authMiddleware, filterExpenses);

export default ExpenseRouter;