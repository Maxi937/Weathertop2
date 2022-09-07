"use strict";

const map = {
  createMap(stations) {
    //Create Map object and set view to Ireland Center
    var map = L.map("map").setView([53.44, -7.50], 6);

    //sets the style of the Map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 9,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    //Add map markers for each station
    for (const station of stations){
      var marker = L.marker([station.latitude, station.longitude]).addTo(map);
      marker.bindPopup(`${station.name}`);
    }

    //Add big red circle
    /*var circle = L.circle([51.508, -0.11], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(map);*/

    //Add polygon shape
    /*var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047],
    ]).addTo(map);*/

    //Adding popup Directly to Coord
    //var popup = L.popup().setLatLng([51.513, -0.09]).setContent("I am a standalone popup.").openOn(map);
  },

};

/*On click event
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);*/
