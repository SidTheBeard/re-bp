require("dotenv").config();
const express = require("express"),
	app = express(),
	cors = require("cors"),
	bodyParser = require("body-parser"),
	PORT = process.env.PORT || 3001;

const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/admin", loginRequired, adminRoutes);

app.get("/", function(req,res,next) {
	res.send("HELLO!");
});

app.use(function(req,res,next) {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
	console.log(`Server is starting on PORT: ${PORT}`);
});