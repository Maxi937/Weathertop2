"use strict";

const axios = require("axios");

const openWeatherApiRequests = {
  getAutoReading(lat, lon) {
    const response = axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?",
      params: {
        lat: lat,
        lon: lon,
        appid: "2984054b61dde353e5a927e8eff343a1",
        units: "metric",
      },
    })
      .then(function (response) {
        console.log("OpenWeatherApi: Successful Call");
        return response.data;
      })
      .catch(function (response) {
        console.log("OpenWeatherApi: Bad Call");
        return response.response.data;
      });
    return response;
  },
};

module.exports = openWeatherApiRequests;
