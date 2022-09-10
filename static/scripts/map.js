"use strict";

const map = {
  createMap(stations) {
    //Create Map object and set view to Ireland Center
    var map = L.map("map").setView([53.44, -7.5], 6);

    const geocodeService = L.esri.Geocoding.geocodeService({
      apikey: "AAPK125187cddb704cbdbad533321d6f6abeduL1_n55GRKRuOytjVJIY7jIej0zIcTKcT4qp9EDmw2A6Ly7r7TC34RiSDJY5XYI",
    });

    //sets the style of the Map
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 11,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    //Add map markers for each station
    for (const station of stations) {
      var marker = L.marker([station.latitude, station.longitude]).addTo(map);
      marker.bindPopup(`${station.name}`);
    }

    //On click event
    var clickMarker = L.marker();
    map.on("click", onMapClick);

    function onMapClick(e) {
      clickMarker.remove(map);
      clickMarker = L.marker(e.latlng).addTo(map);

      geocodeService
        .reverse()
        .latlng(e.latlng)
        .run(function (error, result) {
          if (result.address.Neighborhood == "") {
            clickMarker.bindPopup(`
          <div class="ui left labeled button" tabindex="0">
          <a class="ui basic right pointing label">
            <section>
              <b>Lat</b>:${e.latlng.lat.toFixed(2)}, <b>Lng:</b>${e.latlng.lng.toFixed(2)}
            </section>
            </a>
            <div class="ui mini blue button">
              Copy
            </div>
          </div>`);
          } else {
            clickMarker.bindPopup(`
          <div class="ui left labeled button" tabindex="0">
            <a class="ui basic right pointing label">
              <section>
                ${result.address.Neighborhood}
              </section>
            </a>
            <div class="ui blue button">
              <form action="/dashboard/addstation" method="post">
                <input type="hidden" value=${result.address.Neighborhood} name="name">
                <input type="hidden" value=${e.latlng.lat.toFixed(2)} name="latitude">
                <input type="hidden" value=${e.latlng.lng.toFixed(2)} name="longitude">
              <button type="submit" class="btn-link">Add Station</button>
            </form>
            </div>

            
          </div>
          `);
          }
          clickMarker.openPopup();
        });
      map.flyTo(e.latlng);
    }
  },
};

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
