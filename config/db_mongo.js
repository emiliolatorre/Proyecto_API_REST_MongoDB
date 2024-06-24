const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.DB_HOST);

const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to MongoDB established"));

module.exports = mongoose;