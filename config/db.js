const mongoose = require("mongoose");
const env=require("dotenv");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("DB connected");
    } catch (err) {
        console.log(err)
    }
};

module.exports = connectDb;