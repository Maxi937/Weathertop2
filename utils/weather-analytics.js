"use strict";

const weatherAnalytics = {

  getLastestReading(station) {
    let lastestReading = null;
    if (station.readings.length > 0) {
      lastestReading = station.readings[0];
      return lastestReading
    }
    return null;
  },
};

module.exports = weatherAnalytics;