import mongoose, { model, Schema, Types } from "mongoose";

const movieSchema = Schema({
    title: {type: String, required: true},
    year: {type: Date},
    gender: {type: String, default: "Drama"},
    watched: {type: Boolean, default: false},
    rating: {type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], default: 1},
    createdAt: {type: Date, default: Date.now}
})

export const Movie = mongoose.model('Movie', movieSchema)