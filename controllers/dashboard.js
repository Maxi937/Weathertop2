"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();
    const latestReadings = stationStore.getAllLatestStationReadings(stations);
    const weatherReports = weatherAnalytics.generateMultiWeatherReports(latestReadings);

    for (const station of stations) {
      station.latitude = Number(station.latitude).toFixed(2);
      station.longitude = Number(station.longitude).toFixed(2);
    }

    const viewData = {
      title: "Dashboard",
      stations: stations,
      weatherReports: weatherReports,
    };

    //logger.info(weatherReports);
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
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
