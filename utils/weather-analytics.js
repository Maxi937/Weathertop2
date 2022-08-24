"use strict";

const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");

const weatherAnalytics = {

  getWeather(code) {
    const weatherStore = weatherAnalyticsStore.weatherCodes;

    for (let i = 0; i < weatherStore.length; i++) {
      if (code == weatherStore[i].code) {
        return weatherStore[i]
      }
    }
    return null;
  },

  getBeaufort(windSpeed) {
    const beaufortStore = weatherAnalyticsStore.beaufortScale;

    for (let i = 0; i < beaufortStore.length; i++) {
      if (windSpeed >= beaufortStore[i].min && windSpeed <= beaufortStore[i].max) {
        return beaufortStore[i].beaufort;
      }
    }
    return null;
  },

  getTempAsFaren(temperature) {
    return (temperature * 9) / 5 + 32;
  },

  //Need Propper Error Checking instead of just returning North
  getWindDirection(windDirection){
    const compassStore = weatherAnalyticsStore.compass;
  
    for (let i = 0; i < compassStore.length; i++) {
      if (windDirection >= compassStore[i].min && windDirection <= compassStore[i].max) {
        return compassStore[i].direction;
      }
    }
    return compassStore[0].direction;
  },

  getWindChill(temperature, windSpeed){
    const v = Math.pow(windSpeed, 0.16);
    const result = 13.12 + (.6215 * temperature) - (11.37 * v) + (.3965 * temperature * v)

    return result.toFixed(2);
  },

  generateWeatherReport(reading) {
    if (reading == null){
      return null
    }
    
    const weatherReport = {
          // Static from Reading input
          readingId: reading.id,
          temperature: reading.temperature,
          pressure: reading.pressure,
          windSpeed: reading.windSpeed,

          // Dynamic from Reading input
          farenheit: this.getTempAsFaren(reading.temperature),
          weather: this.getWeather(reading.code).weather,
          weatherIcon: this.getWeather(reading.code).icon,
          beaufort: this.getBeaufort(reading.windSpeed),
          windDirection: this.getWindDirection(reading.windDirection),
          windChill: this.getWindChill(reading.temperature, reading.windSpeed)
    } 
    return weatherReport;
  },

  generateMultiWeatherReports(readings) {
    const weatherReportList = [];

    for (let i = 0; i < readings.length; i++) {
      let weatherReport = this.generateWeatherReport(readings[i]);
      weatherReportList.push(weatherReport);
    }
    return weatherReportList;
  },
};

module.exports = weatherAnalytics;
