"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const station = require("./controllers/station.js");
const accounts = require("./controllers/accounts.js")
const user = require("./controllers/user.js")


//Accounts
router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

//User
router.get("/user", user.index)
router.get("/user/edituserdetails", user.editUserDetails)
router.post("/user/updateuserdetails", user.updateUserDetails)

//About
router.get("/about", about.index);

//Station
router.get("/station/:id", station.index);
router.get("/station/:id/deletereading/:readingId", station.deleteReading);
router.post("/station/:id/addreading", station.addReading);

//Dashboard
router.get("/dashboard", dashboard.index);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);
router.post("/dashboard/addstation", dashboard.addStation);

module.exports = router;
