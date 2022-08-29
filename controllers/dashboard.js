"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");
const accounts = require("./accounts.js")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);
    const weatherReports = weatherAnalytics.generateMultiWeatherReports(stations);

    //  Make this like how the date and time are handled, becuase this is changing the JSON file --
    //  If addReading is called it saves the JSON and temp changes to the data while the program --
    //  is running get saved, such as the lat and long here:
    //for (const station of stations) {
    //  station.latitude = Number(station.latitude).toFixed(2);
    //  station.longitude = Number(station.longitude).toFixed(2);
    //}

    const viewData = {
      title: "Dashboard",
      stations: stations,
      weatherReports: weatherReports,
      loggedInUser: loggedInUser
    };
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request)
    const newStation = {
      id: uuid.v1(),
      userId: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
