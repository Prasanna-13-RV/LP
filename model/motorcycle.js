const mongoose = require("mongoose")
const MotorcycleSchema = new mongoose.Schema({
    model: String,
    manufacturer: String,
    price: Number,
    rating: Number,
    image: String
})

module.exports = mongoose.model("Motorcycle", MotorcycleSchema)