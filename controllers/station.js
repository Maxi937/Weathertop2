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
    const lastestReading = weatherAnalytics.getLastestReading(station);
    console.log(lastestReading);
    const viewData = {
      title: "station",
      station: stationStore.getStation(stationId),
      lastestReading: lastestReading
    };
    response.render("station", viewData);
  }
};

module.exports = station;