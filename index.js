const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const workoutRoutes = require("./routes/workout");


const cors = require("cors")

const port = 4000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.use(cors())

//Mongo DB

mongoose.connect("mongodb+srv://admin:admin1234@b443.wcxr2v4.mongodb.net/MTE?retryWrites=true&w=majority&appName=B443", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.once("open", () => console.log("now connected to the MongoDB Atlas"));

app.use("/users", userRoutes)
app.use("/workouts", workoutRoutes);


if(require.main === module){
	app.listen(process.env.PORT || port, () => {
		console.log(`API is now online on port ${process.env.PORT || port}`)
	})
}

module.exports = {app, mongoose}