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

  generateWeatherReport(reading){
    const weatherReport = {
      readingId: reading.id,
      temperature: reading.temperature,
      pressure: reading.pressure,
      windSpeed: reading.windSpeed,
      farenheit: this.getTempAsFaren(reading.temperature),
      weather: this.getWeather(reading.code),
      beaufort: this.getBeaufort(reading.windSpeed),
    };
    return weatherReport;
  },

  //Generates a Weather report for each reading from an array of readings
  generateMultiWeatherReports(readings){
    const weatherReportList = [];

    for (let i = 0; i < readings.length; i++){
      let weatherReport = this.generateWeatherReport(readings[i])
      weatherReportList.push(weatherReport);
    };
    return weatherReportList;
  },

};

module.exports = weatherAnalytics;
