const faker = require("faker")
const mongoose = require("mongoose");
const Motorcycle = require("../model/motorcycle");

mongoose.connect("mongodb://localhost:27017/motorcycle",{ 
    useNewUrlParser: true , useUnifiedTopology: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const motorcycleDB = async () => {
    await Motorcycle.deleteMany({})
    for (let i = 0; i<10; i++){
        const randomPrice = Math.floor(Math.random() * 200000 + 1);
        const randomRating = Math.floor(Math.random() * 5 + 1);
        const motorcycle = new Motorcycle({
            model: faker.vehicle.model(),
            manufacturer: faker.vehicle.manufacturer(),
            price: randomPrice,
            rating: randomRating,
            image: faker.image.transport()
        })
        await motorcycle.save()
    }
}
motorcycleDB().then(() => mongoose.connection.close())