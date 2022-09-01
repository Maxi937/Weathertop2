"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics")
const uuid = require("uuid");
const accounts = require("./accounts.js");
const openWeatherApi = require("../utils/openweather-api")


const station = {
  index(request, response) {
    logger.info("station rendering");
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const weatherReport = weatherAnalytics.generateWeatherReport(station.readings);
    const loggedInUser = accounts.getCurrentUser(request);

    const viewData = {
      title: station.name + " Station",
      station: station,
      weatherReport: weatherReport,
      loggedInUser: loggedInUser
    };
    response.render("station", viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;

    const newReading = {
      id: uuid.v1(),
      date: new Date(),
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
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  //Will not add a reading on error, will print reason for failure to console
  //Can pull the error code out of the api request and handle in specific way
  //Antrim always fail because latitude is out of bounds
  async addAutoReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);

    const openWeatherReading = await openWeatherApi.getAutoReading(station.latitude, station.longitude)

    try {
      const newReading = {
        id: uuid.v1(),
        date: new Date(),
        code: openWeatherReading.weather[0].id,
        temperature: openWeatherReading.main.temp,
        windSpeed: openWeatherReading.wind.speed,
        pressure: openWeatherReading.main.pressure,
        windDirection: openWeatherReading.wind.deg,
        autoWeatherData: openWeatherReading.weather[0]
      }
      console.log("new Reading: ", newReading)
      stationStore.addReading(stationId, newReading);
    } catch (error) {
      console.log("Status Code: ", openWeatherReading.cod)
      console.log("Message: ", openWeatherReading.message)
    } 
    response.redirect("/station/" + stationId);
  }
}

module.exports = station;
