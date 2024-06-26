const express = require("express");

const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const feedbackRoute = require("./routes/feedback");
const stripeRoute = require("./routes/stripe");

dotenv.config();

const port = process.env.PORT;

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected ..."))
	.catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// initial response
app.get("/", (req, res) => {
	res.sendFile("public/index.html", { root: __dirname });
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/items", itemRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/checkout", stripeRoute);

// middleware for error handling
app.use(function (req, res, next) {
	res.sendFile("public/error.html", { root: __dirname });
});

app.listen(port || 5000, () => {
	console.log(`Server Running on Port ${port}`);
});
