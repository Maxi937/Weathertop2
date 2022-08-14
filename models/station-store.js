"use strict";

const _ = require("lodash");

const stationStore = {
  stationCollection: require("./station-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getAllLatestStationReadings(){
    const readingList = [];

    for (let i = 0; i < this.stationCollection.length; i++){
      let latestReading = this.getLatestStationReading(this.stationCollection[i])
      readingList.push(latestReading);
    }
    return readingList;
  },


  getStation(id) {
    return _.find(this.stationCollection, { id: id});
  },

  getLatestStationReading(station){
    let latestReading = null;

    if (station.readings.length > 0) {
      latestReading = station.readings.length - 1;
      return station.readings[latestReading];
    }
    return null;
  }

};

module.exports = stationStore;
