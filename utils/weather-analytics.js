"use strict";

const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");
const _ = require("lodash");

const weatherAnalytics = {
  generateWeatherReport(station) {

    if (station.readings.length > 0) {

      const maxReadings = this.getMax(station.readings)
      const minReadings = this.getMin(station.readings)
      const reading = _.last(station.readings);
    
      const weatherReport = {
        // Static from Reading input
        readingId: reading.id,
        temperature: reading.temperature,
        pressure: reading.pressure,
        windSpeed: reading.windSpeed,

        //MaxMins
        maxTemperature: maxReadings.maxTemperature,
        maxWindSpeed: maxReadings.maxWindSpeed,
        maxPressure: maxReadings.maxPressure,
        minTemperature: minReadings.minTemperature,
        minWindSpeed: minReadings.minWindSpeed,
        minPressure: minReadings.minPressure,

        // Dynamic from Reading input
        farenheit: this.getTempAsFaren(reading.temperature),
        weather: this.getWeather(reading.code).weather,
        weatherIcon: this.getWeather(reading.code).icon,
        beaufort: this.getBeaufort(reading.windSpeed),
        windDirection: this.getWindDirection(reading.windDirection),
        windChill: this.getWindChill(reading.temperature, reading.windSpeed),
      };
      return weatherReport;
    }
  },

  getWeather(code) {
    const weatherStore = weatherAnalyticsStore.weatherCodes;

    for (let i = 0; i < weatherStore.length; i++) {
      if (code == weatherStore[i].code) {
        return weatherStore[i];
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
  getWindDirection(windDirection) {
    const compassStore = weatherAnalyticsStore.compass;

    for (let i = 0; i < compassStore.length; i++) {
      if (windDirection >= compassStore[i].min && windDirection <= compassStore[i].max) {
        return compassStore[i].direction;
      }
    }
    return compassStore[0].direction;
  },

  getWindChill(temperature, windSpeed) {
    const v = Math.pow(windSpeed, 0.16);
    const result = 13.12 + 0.6215 * temperature - 11.37 * v + 0.3965 * temperature * v;

    return result.toFixed(2);
  },

  generateMultiWeatherReports(stations) {
    const weatherReportList = [];

    for (const station of stations) {
      let weatherReport = this.generateWeatherReport(station);
      weatherReportList.push(weatherReport);
    }
    return weatherReportList;
  },

  getMax(readings) {
    let maxTemperature = 0;
    let maxWindSpeed = 0;
    let maxPressure = 0;

    for (const reading of readings) {
      if(reading.temperature > maxTemperature){
        maxTemperature = reading.temperature;
      }

      if(reading.windSpeed > maxWindSpeed){
        maxWindSpeed = reading.windSpeed;
      }

      if(reading.pressure > maxPressure){
        maxPressure = reading.pressure;
      }
    }
    const maxResult = {
      maxTemperature: maxTemperature,
      maxWindSpeed: maxWindSpeed,
      maxPressure: maxPressure
    }
    
    console.log("Max:", maxResult);
    return maxResult;
  },

  getMin(readings){
    let minTemperature = _.first(readings).temperature;
    let minWindSpeed = _.first(readings).temperature;
    let minPressure = _.first(readings).pressure;

    for(const reading of readings){
      if(reading.temperature < minTemperature){
        minTemperature = reading.temperature;
      }

      if(reading.windSpeed < minWindSpeed){
        minWindSpeed = reading.windSpeed;
      }

      if(reading.pressure < minPressure){
        minPressure = reading.pressure;
      }
    }
    const minResult = {
      minTemperature: minTemperature,
      minWindSpeed: minWindSpeed,
      minPressure: minPressure
    }
    
    console.log("Min", minResult);
    return minResult;
  }
};

module.exports = weatherAnalytics;
