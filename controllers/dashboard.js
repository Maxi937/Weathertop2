"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const weatherAnalytics = require("../utils/weather-analytics");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");

    const stations = stationStore.getAllStations();
    const weatherReports = weatherAnalytics.generateMultiWeatherReports(
      stationStore.getAllLatestStationReadings(stations)
    );

    const viewData = {
      title: "Dashboard",
      stations: stations,
      weatherReports: weatherReports,
    };

    console.log("Reports", weatherReports);
    response.render("dashboard", viewData);
  },

  //addStation(request, response) {
  //  const loggedInUser = accounts.getCurrentUser(request);
  //  const newPlayList = {
  //  id: uuid.v1(),
  //  userid: loggedInUser.id,
  //  title: request.body.title,
  //    songs: []
  //  };
  //  logger.debug("Creating a new Playlist", newPlayList);
  //  playlistStore.addPlaylist(newPlayList);
  //  response.redirect("/dashboard");
  //}
};

module.exports = dashboard;
