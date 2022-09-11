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
      marker.bindPopup(`
      <a class="ui label" id="mapLink" href="/station/${station.id}">
        <i class="big ${station.weatherReport.icon} icon" id="mapLink-icon"></i> ${station.name}
      </a>
      </div>
        `)
      }

    //On click event
    var clickMarker = L.marker();
    map.on("click", onMapClick);

    function onMapClick(e) {
      clickMarker.remove(map);
      clickMarker = L.marker(e.latlng).addTo(map);
      var testLat = e.latlng.lat

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
              <button class="ui mini blue button" onclick="copyLatLng(${e.latlng.lat.toFixed(2)},${e.latlng.lng.toFixed(2)})">
                Copy
              </button>
            </div>`);
          } else {
            clickMarker.bindPopup(`
            <div class="ui left labeled button" tabindex="0">
              <a class="ui basic right pointing label">
              <section>
                ${result.address.Neighborhood}
              </section>
              </a>
              <form action="/dashboard/addstation" method="post" id="myForm">
                <input type="hidden" value=${result.address.Neighborhood} name="name">
                <input type="hidden" value=${e.latlng.lat.toFixed(2)} name="latitude">
                <input type="hidden" value=${e.latlng.lng.toFixed(2)} name="longitude">
              </form>
              <button type="submit" form="myForm" class="ui blue button">Add Station</button>
            </div>
          `);
          }
          clickMarker.openPopup();
        });
      map.flyTo(e.latlng);
    }
  },
};

function copyLatLng(lat, lng) {
  document.getElementById("stationLatitude").value = lat
  document.getElementById("stationLongitude").value = lng
}