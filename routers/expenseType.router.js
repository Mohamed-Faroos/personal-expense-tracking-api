import express from 'express';
import { authMiddleware } from '../middleware';
import { getAllExpenseTypes } from '../controllers/expenseType.controller';

const ExpenseTypeRouter = express.Router();

/* route for user login api */
ExpenseTypeRouter.get("/all", authMiddleware, getAllExpenseTypes);


export default ExpenseTypeRouter;