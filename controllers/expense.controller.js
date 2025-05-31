import { HTTP_CODE } from "../lib/enum/httpCode";
import ExpenseModel from "../models/expense.model";
import ExpenseTypeModel from "../models/expenseType.model";
import moment from "moment";

const EXPENSE_COLORS = {
    FOOD: "#FF6384",
    TRAVELING: "#36A2EB",
    FITNESS: "#FFCE56",
    ROOM: "#4BC0C0",
    ENTERTAINMENT: "#9966FF",
    OTHER: "#FF9F40",
};

/**
 * The function `addExpense` is an asynchronous function that adds a new expense to the database and
 * returns a success message or an error message accordingly.
 */
export const addExpense = async (req, res) => {
    try {
        const { title, amount, description, date, expenseType } = req.body;
        const userId = req.user?._id;

        if (!title || !amount || !description || !date || !expenseType) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Title, Amount, description, date and expenseType are required' });
        }

        const expenseDate = new Date(date);
        if (isNaN(expenseDate.getTime())) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ message: "Invalid date format" });
        }

        const typeExists = await ExpenseTypeModel.findById(expenseType);
        if (!typeExists) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Expense type not found' });
        }

        const newExpense = new ExpenseModel({
            title: title,
            amount: amount,
            date: expenseDate,
            description: description,
            expenseType: expenseType,
            createdBy: userId
        });

        await newExpense.save();

        return res.status(HTTP_CODE.CREATED).json({
            message: "Expense added successfully",
            expense: newExpense,
        });

    } catch (error) {
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
            message: "Failed to add expense",
            error: error.message,
        });
    }
}

/**
 * The function `editExpense` updates an existing expense with the provided data in a Node.js
 * application using Express and Mongoose.
 */
export const editExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, amount, date, description, expenseType } = req.body;

        const expense = await ExpenseModel.findById(id);

        if (!expense) {
            return res.status(HTTP_CODE.NOT_FOUND).json({ message: "Expense not found" });
        }

        // Update fields
        expense.title = title || expense.title;
        expense.amount = amount || expense.amount;
        expense.date = date || expense.date;
        expense.description = description || expense.description;
        expense.expenseType = expenseType || expense.expenseType;

        await expense.save();

        return res.status(HTTP_CODE.OK).json({
            message: "Expense updated successfully",
            expense,
        });
    } catch (error) {
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

/**
 * The function `deleteExpense` deletes an expense by its ID and returns a success message or an error
 * message if the expense is not found or an internal server error occurs.
 */
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpenseModel.findById(id);

        if (!expense) {
            return res.status(HTTP_CODE.NOT_FOUND).json({ message: "Expense not found" });
        }

        await ExpenseModel.findByIdAndDelete(id);

        return res.status(HTTP_CODE.OK).json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getExpenseSummaries = async (req, res) => {
    try {
        const userId = req.user._id;

        const expenseTypes = await ExpenseTypeModel.find();

        // Map expenseTypeId to label
        const typeMap = {};
        const labels = [];
        const backgroundColors = [];
        expenseTypes.forEach(type => {
            typeMap[type._id.toString()] = type.label;
            labels.push(type.label);
            backgroundColors.push(EXPENSE_COLORS[type.label] || "#cccccc");
        });

        const now = moment();
        const startOfCurrentMonth = now.clone().startOf("month").toDate();
        const endOfCurrentMonth = now.clone().endOf("month").toDate();

        const startOfPreviousMonth = now.clone().subtract(1, "month").startOf("month").toDate();
        const endOfPreviousMonth = now.clone().subtract(1, "month").endOf("month").toDate();

        const startOfYear = now.clone().startOf("year").toDate();
        const endOfYear = now.clone().endOf("year").toDate();

        // Fetch all needed expenses by user
        const [currentMonthExpenses, previousMonthExpenses, currentYearExpenses] = await Promise.all([
            ExpenseModel.find({ createdBy: userId, date: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth } }),
            ExpenseModel.find({ createdBy: userId, date: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth } }),
            ExpenseModel.find({ createdBy: userId, date: { $gte: startOfYear, $lte: endOfYear } })
        ]);

        // Helper to format chart data and total
        const summarize = (expenses) => {

            const dataMap = {};
            let total = 0;

            expenses.forEach(exp => {
                const typeLabel = typeMap[exp.expenseType.toString()];
                if (!dataMap[typeLabel]) {
                    dataMap[typeLabel] = 0;
                }
                dataMap[typeLabel] += exp.amount;
                total += exp.amount;
            });

            const data = labels.map(label => dataMap[label] || 0);

            return {
                chart: {
                    labels,
                    datasets: [{ data, backgroundColor: backgroundColors }]
                },
                total
            };
        };

        const currentMonth = summarize(currentMonthExpenses);
        const previousMonth = summarize(previousMonthExpenses);
        const currentYear = summarize(currentYearExpenses);

        return res.status(HTTP_CODE.OK).json({
            message: "Expense summaries fetched successfully",
            data: {
                currentMonthExpense: currentMonth.chart,
                previousMonthExpense: previousMonth.chart,
                currentYearExpense: currentYear.chart,
                currentMonthTotal: currentMonth.total,
                currentYearTotal: currentYear.total
            }
        });

    } catch (error) {
        return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong", error });
    }
};

export const filterExpenses = async (req, res) => {
    try {
        const { startDate, endDate, expenseType } = req.body;
        const userId = req.user._id;

        const query = {
            createdBy: userId,
            date: {
                ...(startDate && { $gte: new Date(startDate) }),
                ...(endDate && { $lte: new Date(endDate) })
            },
            ...(expenseType && { expenseType })
        };

        const expenses = await ExpenseModel.find(query)
            .sort({ date: -1 })
            .populate("expenseType");

        const structuredExpenses = Object.entries(
            expenses.reduce((acc, expense) => {
                const dateKey = moment(expense.date).format("YYYY-MM-DD");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push(expense);
                return acc;
            }, {})
        ).map(([date, data]) => ({ date, expenses: data }));

        res.status(200).json({ data: structuredExpenses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
};