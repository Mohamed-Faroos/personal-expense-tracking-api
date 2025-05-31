import expenseTypeModel from "../models/expenseType.model";

export const seedExpenseTypes = async () => {
    const count = await expenseTypeModel.countDocuments();
    if (count === 0) {
        await expenseTypeModel.create([
            { label: "FOOD", name: "Food" },
            { label: "TRAVELING", name: "Traveling" },
            { label: "FITNESS", name: "Fitness" },
            { label: "ENTERTAINMENT", name: "Entertainment" },
            { label: "ROOM", name: "Room" },
            { label: "OTHER", name: "other" },
        ]);
        console.log("Seeded default expense types.");
    } else {
        console.log("Expense types already exist.");
    }
};