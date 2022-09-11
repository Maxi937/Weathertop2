"use strict";

const weatherAnalyticsStore = require("../utils/weather-analytics-store.json");
const logger = require("./logger");
const _ = require("lodash");


const weatherAnalytics = {
  generateWeatherReport(readings) {
    if (readings.length > 0) {
      const maxReadings = this.getMax(readings);
      const minReadings = this.getMin(readings);
      const reading = _.last(readings);

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

        //Case for auto Reading
        weather: this.getWeather(reading),

        //Dynamic from Reading input
        farenheit: this.getTempAsFaren(reading.temperature),
        beaufort: this.getBeaufort(reading.windSpeed),
        windDirection: this.getWindDirection(reading.windDirection),
        windChill: this.getWindChill(reading.temperature, reading.windSpeed),

        //Trends
        temperatureTrend: this.getTrends(readings, "temperature"),
        windSpeedTrend: this.getTrends(readings, "windSpeed"),
        pressureTrend: this.getTrends(readings, "pressure"),
      };
      return weatherReport;
    }
    return null;
  },

  getWeather(reading) {
    const weatherCode = reading.code;
    const weatherStore = weatherAnalyticsStore.weatherCodes;

    for (let i = 0; i < weatherStore.length; i++) {
      if (weatherCode == weatherStore[i].code) {
        const weather = {
          code: weatherCode,
          weather: weatherStore[i].weather,
          icon: weatherStore[i].icon,
        };
        return weather;
      }
    }
    // Assumption: if none of the readings in the JSON, must be an auto reading
    const weather = {
      code: reading.autoWeatherData.id,
      weather: reading.autoWeatherData.main,
      icon: reading.autoWeatherData.icon,
    };
    return weather;
  },

  getBeaufort(windSpeed) {
    const windSpeedRounded = parseFloat(windSpeed).toFixed(0)
    const beaufortStore = weatherAnalyticsStore.beaufortScale;

    for (const beaufortMeasurement of beaufortStore) {
      if (windSpeedRounded >= beaufortMeasurement.min && windSpeedRounded <= beaufortMeasurement.max) {
        return beaufortMeasurement.beaufort;
      }
    }
    return null;
  },

  getTempAsFaren(temperature) {
    const result = (temperature * 9) / 5 + 32
    return result.toFixed(2);
  },

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
      let weatherReport = this.generateWeatherReport(station.readings);
      weatherReportList.push(weatherReport);
    }
    return weatherReportList;
  },

  getMax(readings) {
    let maxTemperature = 0;
    let maxWindSpeed = 0;
    let maxPressure = 0;

    for (const reading of readings) {
      if (reading.temperature > maxTemperature) {
        maxTemperature = reading.temperature;
      }

      if (reading.windSpeed > maxWindSpeed) {
        maxWindSpeed = reading.windSpeed;
      }

      if (reading.pressure > maxPressure) {
        maxPressure = reading.pressure;
      }
    }
    const maxResult = {
      maxTemperature: maxTemperature,
      maxWindSpeed: maxWindSpeed,
      maxPressure: maxPressure,
    };
    return maxResult;
  },

  getMin(readings) {
    let minTemperature = _.first(readings).temperature;
    let minWindSpeed = _.first(readings).windSpeed;
    let minPressure = _.first(readings).pressure;

    for (const reading of readings) {
      if (reading.temperature < minTemperature) {
        minTemperature = reading.temperature;
      }

      if (reading.windSpeed < minWindSpeed) {
        minWindSpeed = reading.windSpeed;
      }

      if (reading.pressure < minPressure) {
        minPressure = reading.pressure;
      }
    }
    const minResult = {
      minTemperature: minTemperature,
      minWindSpeed: minWindSpeed,
      minPressure: minPressure,
    };
    return minResult;
  },

  getTrends(readings, trendToAnalyse) {
    if (readings.length >= 3) {
      readings = readings.slice(-3);

      const trendControl = readings[1][trendToAnalyse];

      if (
        trendControl > parseFloat(readings[0][trendToAnalyse]) &&
        parseFloat(readings[2][trendToAnalyse]) > trendControl
      ) {
        return "arrow up icon";
      }

      if (
        trendControl < parseFloat(readings[0][trendToAnalyse]) &&
        parseFloat(readings[2][trendToAnalyse]) < trendControl
      ) {
        return "arrow down icon";
      }
      return null;
    }
  },
};

module.exports = weatherAnalytics;
