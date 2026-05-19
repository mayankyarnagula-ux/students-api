const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://aitam:aitam123@aitam1.w8bdswp.mongodb.net/?appName=aitam1");
        console.log("DB connected");
    } catch (err) {
        console.log(err)
    }
};

module.exports = connectDb;