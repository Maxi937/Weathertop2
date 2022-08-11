"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);

    const station = stationStore.getStation(stationId); 
    const latestReading = weatherAnalytics.getLatestReading(station);

    console.log("Rendering lastReading", latestReading);
    const viewData = {
      title: station.name + " Station",
      station: stationStore.getStation(stationId),
      weatherReport: {
        latestReading: latestReading,
        beaufort: weatherAnalytics.getBeaufort(latestReading.windSpeed),
        farenheit: weatherAnalytics.getTempAsFaren(latestReading.temperature),
      }
      
    };
    console.log(viewData.weatherReport.farenheit)
    response.render("station", viewData);
  }
};

module.exports = station;