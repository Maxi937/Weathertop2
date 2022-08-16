"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {

  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.store.findAll(this.collection);
  },


  getAllLatestStationReadings(stationCollection){
    const readingList = [];

    for (let i = 0; i < stationCollection.length; i++){
      let latestReading = this.getLatestStationReading(stationCollection[i].id)
      readingList.push(latestReading);
    }
    return readingList;
  },


  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getLatestStationReading(id){
    let station = this.store.findOneBy(this.collection, { id: id });
    let latestReading = null;

    if (station.readings.length > 0) {
      latestReading = station.readings.length - 1;
      return station.readings[latestReading];
    }
    return null;
  }

};

module.exports = stationStore;
