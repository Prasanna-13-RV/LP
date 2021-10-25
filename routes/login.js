const express = require("express");
const router = express.Router();
const User = require("../model/user")
const passport = require("passport")

router.get("/login", (req,res) => {
    res.render("login/login")
})

router.post("/login" , passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), (req,res) => {
    res.redirect("/")
})

router.get("/register", (req,res) => {
    res.render("login/register")
})

router.post("/register", async(req,res) => {
    try{
        const {username, email, password, confirmPassword} = req.body
        if(!(password === confirmPassword)) {
            req.flash("error", "Password does not match!!!!");
            return res.redirect("/register")
        }
        const user = await new User({email,username})
        const registredUser = await User.register(user, password)
        req.login(registredUser, (err)=> {
            if(err){
                console.log(err)
            }else{
                req.flash("success", "Successfully registered your account")
                res.redirect("/")
            }
        })
    } catch(err) {
        console.log(err)
    }
})

router.get("/logout", (req,res) => {
    req.logout()
    res.redirect("/")   
})

module.exports = router;