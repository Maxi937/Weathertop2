"use strict";

const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");

const weatherAnalytics = {
  getWeather(code) {
    for (let i = 0; i < weatherAnalyticsStore.weatherCodes.length; i++) {
      let codeStore = weatherAnalyticsStore.weatherCodes[i];
      if (code == codeStore.code) {
        return codeStore.weather;
      }
    }
    return null;
  },

  //Refactor to be like getWindDirection
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
          readingId: reading.id,
          temperature: reading.temperature,
          pressure: reading.pressure,
          windSpeed: reading.windSpeed,
          farenheit: this.getTempAsFaren(reading.temperature),
          weather: this.getWeather(reading.code),
          beaufort: this.getBeaufort(reading.windSpeed),
          windDirection: this.getWindDirection(reading.windDirection),
          windChill: this.getWindChill(reading.temperature, reading.windSpeed)
    } 
    return weatherReport;
  },

  //Generates a Weather report for each reading from an array of readings **overload WeatherReport Instead?
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
