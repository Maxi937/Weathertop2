"use strict";

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

  getBeaufort(reading){
    console.log (reading);
    return reading;
  }
};

module.exports = weatherAnalytics;