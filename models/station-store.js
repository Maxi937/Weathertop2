"use strict";

const _ = require("lodash");

const stationStore = {
  staionCollection: require("./station-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.staionCollection, { id: id});
  },

  printMe(){
    return "Am I even real";
  }

};

module.exports = stationStore;
