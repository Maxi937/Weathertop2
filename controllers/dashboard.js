"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();
    const weatherReports = weatherAnalytics.generateMultiWeatherReports(stationStore.getAllLatestStationReadings());

    const viewData = {
      title: "Dashboard",
      stations: stations,
      weatherReports: weatherReports,
    };

    //console.log("StationList", viewData.stationList)
    response.render("dashboard", viewData);
  },

};

module.exports = dashboard;
