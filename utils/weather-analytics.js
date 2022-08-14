"use strict";

const { forEach } = require("lodash");
const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");

const weatherAnalytics = {
  getLatestReading(station) {
    let latestReading = null;

    if (station.readings.length > 0) {
      latestReading = station.readings.length - 1;
      return station.readings[latestReading];
    }
    return null;
  },

  getWeather(code) {
    for (let i = 0; i < weatherAnalyticsStore.weatherCodes.length; i++) {
      let codeStore = weatherAnalyticsStore.weatherCodes[i];
      if (code === codeStore.code) {
        return codeStore.weather;
      }
    }
    return null;
  },

  getBeaufort(windSpeed) {
    for (let i = 0; i < weatherAnalyticsStore.beaufortScale.length; i++) {
      let scaleStore = weatherAnalyticsStore.beaufortScale[i];
      if (windSpeed >= scaleStore.min && windSpeed <= scaleStore.max) {
        //console.log(scaleStore);
        return scaleStore.beaufort;
      }
    }
    return null;
  },

  getTempAsFaren(temperature) {
    return (temperature * 9) / 5 + 32;
  },
};

module.exports = weatherAnalytics;
