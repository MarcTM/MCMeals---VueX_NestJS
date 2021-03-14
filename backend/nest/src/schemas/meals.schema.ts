import * as mongoose from 'mongoose';

export const MealSchema = new mongoose.Schema({
    title: String,
    price: Number,
})