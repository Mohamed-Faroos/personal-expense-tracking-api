import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { initDB } from "./helpers/db";
import AuthRouter from "./routers/auth.router";
import ExpenseRouter from "./routers/expense.router";
import ExpenseTypeRouter from "./routers/expenseType.router";

dotenv.config();

const app = express();
const port = process?.env?.PORT || 3000; // Default to port 3000 if process.env.PORT is undefined
const corsOptions = {
    origin: process.env.CORS_URL || "*"
};

initDB();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);
app.use("/expense", ExpenseRouter);
app.use("/expense-type", ExpenseTypeRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
