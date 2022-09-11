"use strict";

const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics")
const userstore = require("../models/user-store");

const user = {
  index(request, response) {
    logger.info("user rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);

    for (const station of stations){
      station.weatherReport = weatherAnalytics.generateWeatherReport(station.readings)
    }

    const viewData = {
      title: loggedInUser.firstName + " " + loggedInUser.lastName,
      stations: stations,
      loggedInUser: loggedInUser,
    };
    response.render("user", viewData);
  },

  editUserDetails(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    const viewData = {
      loggedInUser: loggedInUser
    };
    response.render("edit-user-details", viewData);
  },

  updateUserDetails(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    logger.info("Updating:", loggedInUser)
    logger.info("Updated:", updatedUser);

    userstore.updateUser(loggedInUser, updatedUser);
    response.cookie("station",loggedInUser.email) //Update Cookie
    response.redirect("/user");
  },
};

module.exports = user;

