"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const weatherReport = weatherAnalytics.generateWeatherReport(station);

    station.latitude = Number(station.latitude).toFixed(2);
    station.longitude = Number(station.longitude).toFixed(2);

    const viewData = {
      title: station.name + " Station",
      station: station,
      weatherReport: weatherReport,
    };
    response.render("station", viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
    };
    console.log("new Reading: ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingId;
    logger.debug(`Deleting Song ${readingId} from Playlist ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
