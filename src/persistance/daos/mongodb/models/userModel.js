import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, default: 0 },
    password: { type: String, required: true, default: "" },
    role: { type: String, default: 'users' },
    isGithub: { type: Boolean, required: true, default: false },
    cart: { type: Array, default: [] } 
});


export const UserModel = model('users', userSchema);
