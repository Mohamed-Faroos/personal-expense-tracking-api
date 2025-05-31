import mongoose from "mongoose";
import { seedExpenseTypes } from "./initialDbSeed";

/**
 * The `initDB` function connects to a MongoDB database using the provided URI and logs a success
 * message or an error message.
 */
export const initDB = async () => {
    mongoose.Promise = global.Promise;

        try {
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("✅ MongoDB connected");
            
            // 🔑 Seed default expense data
            await seedExpenseTypes();
        
          } catch (err) {
            console.error("MongoDB connection failed:", err);
            process.exit(1);
          }
}