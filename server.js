const express = require("express");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("./model/user")
const session = require("express-session")
const flash = require("connect-flash")

const loginRoute = require("./routes/login")

const motorcycleRoute = require("./routes/motocycle")

mongoose.connect("mongodb://localhost:27017/motorcycle", { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true })
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const app = express();

app.use(session({
    secret: "IAMAGOODBOY",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}));

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(flash())


app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_Method"))



app.use((req,res,next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user
    next()
})

app.use("/", loginRoute)
app.use("/", motorcycleRoute)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(3000,() => {
    console.log("Server is connected to 3000")
});
