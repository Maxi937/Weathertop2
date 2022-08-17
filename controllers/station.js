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

  addReading(request, response){
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure
    }
    console.log("new Song: ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId)
  }
};

module.exports = station;
