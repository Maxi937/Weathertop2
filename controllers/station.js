"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    //logger.debug("Station id = ", stationId);

    const station = stationStore.getStation(stationId);
    const latestReading = stationStore.getLatestStationReading(stationId);
    const weatherReport = weatherAnalytics.generateWeatherReport(latestReading)

    //console.log("Rendering lastReading", latestReading);
    const viewData = {
      title: station.name + " Station",
      station: stationStore.getStation(stationId),
      weatherReport: weatherReport
    };

    //console.log(viewData.weatherReport);
    response.render("station", viewData);
  },
};

module.exports = station;
