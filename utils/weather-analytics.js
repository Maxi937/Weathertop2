"use strict";

const { forEach } = require("lodash");
const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");

const weatherAnalytics = {

  getLatestReading(station) {
    let latestReading = null;
    if (station.readings.length > 0) {
      latestReading = station.readings.length-1;
      return station.readings[latestReading];
    }
    return null;
  },

  getBeaufort(windSpeed){
    for (let i = 0; i < weatherAnalyticsStore.beaufortScale.length; i++){
      let scale = weatherAnalyticsStore.beaufortScale[i];
      
        if (windSpeed >= scale.min && windSpeed <= scale.max){
          console.log(scale)
          return scale.beaufort;
        }
    }
    return null;
  },

  getTempAsFaren(temperature){
    return temperature * 9 / 5 + 32;
  }
};

module.exports = weatherAnalytics;