"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();
    const latestReadings = stationStore.getAllLatestStationReadings(stations)
    const weatherReports = weatherAnalytics.generateMultiWeatherReports(latestReadings);

    const viewData = {
      title: "Dashboard",
      stations: stations,
      weatherReports: weatherReports,
    };

    //console.log("Reports", weatherReports);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
    id: uuid.v1(),
    name: request.body.name,
      readings: []
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
