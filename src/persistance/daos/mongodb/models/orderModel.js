import { Schema, model } from "mongoose";

const productSchema = new Schema({
    ProductID: { type: Schema.Types.ObjectId, ref: "Product" }, 
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true }, 
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
    products: [productSchema], 
});

export const OrderModel = model("order", orderSchema);
