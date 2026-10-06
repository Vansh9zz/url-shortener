const express = require("express");
const { URL } = require("./models/url")
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connection");
const { restrictToLoggedInUsers , checkAuth } = require("./middlewares/auth");


const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(()=>{console.log("MongoDB Connected")})
;

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUsers, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, ()=>{console.log(`Server started at PORT:${PORT}`)});

