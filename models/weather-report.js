"use strict";

const _ = require("lodash");
const weatherAnalytics = require("../utils/weather-analytics");


const weatherReport = {
 
  beaufort : weatherAnalytics.getBeaufort(reading),

};

module.exports = weatherReport;