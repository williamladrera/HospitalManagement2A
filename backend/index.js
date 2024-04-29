require(`dotenv`).config();
const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose')

// Middleware
app.use(express.json()); // JSON parsing middleware

// DB Connection 
mongoose.set("strictQuery", false)
//from the driver get this:
mongoose.connect(
    process.env.MONGO_URI, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
    console.log(err);
});

db.once("open", () => console.log("connected to MongoDB"));
// Routes
const patientRoute = require('./routes/patientRoute');
app.use('/api/v1/patients', patientRoute); // Mounting patientRoute under /api/v1/patients

// Start server
app.listen(port, () => {

    console.log("new change 1");
    console.log("new change 2");
    console.log("new change 3");
    console.log("new change 4");

    console.log(`Server is running on http://localhost:${port}`);
});

//in package.json 
//go cmd
//npm install dependencies
//env should be in the same path as index to hide the mongo connection
//SELECT * FROM patients WHERE lastName = 'Ji"