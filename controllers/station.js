"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics")
const uuid = require("uuid");
const accounts = require("./accounts.js")

const station = {
  index(request, response) {
    logger.info("station rendering");
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const weatherReport = weatherAnalytics.generateWeatherReport(station);
    const loggedInUser = accounts.getCurrentUser(request);

    //  Make this like how the date and time are handled, becuase this is changing the JSON file --
    //  If addReading is called it saves the JSON and temp changes to the data while the program --
    //  is running get saved, such as the lat and long here:
    station.latitude = Number(station.latitude).toFixed(2);
    station.longitude = Number(station.longitude).toFixed(2);

    const viewData = {
      title: station.name + " Station",
      station: station,
      weatherReport: weatherReport,
      loggedInUser: loggedInUser
    };
    response.render("station", viewData);
  },

  addReading(request, response) {
    const date = new Date()
    const stationId = request.params.id;

    const newReading = {
      id: uuid.v1(),
      date: date,
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
