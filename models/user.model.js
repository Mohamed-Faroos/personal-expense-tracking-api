import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    createdBy: { type: String, required: false },
    createdDate: { type: Date, required: false }
})

const UserModel = mongoose.model("User", UserSchema)
export default UserModel;