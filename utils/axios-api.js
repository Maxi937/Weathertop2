"use strict";

const axios = require("axios");

const apiRequests = {
  async getAutoReading(lat, lon) {
    axios({
      method: "get",
      url: "https://api.openweathermap.org/data/2.5/weather?",
      params: {
        lat: lat,
        lon: lon,
        appid: "2984054b61dde353e5a927e8eff343a1",
      },
    })
      .then(function (response) {
        console.log(response.data);
        return response.data 
      })
      .catch(function (response) {
        console.log(response);
      });
  },
};

module.exports = apiRequests;
