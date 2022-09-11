# Description

WeatherApp to log and track readings.

## Github

<https://github.com/Maxi937/Weathertop2>

## Deployed

<https://mysterious-waters-92129.herokuapp.com>

## Usage

- Add Stations and then Update Readings manually.
- Readings can be automatically generated via the button.
- Stations can be added from the map by clicking on an area and following the prompt.

## Known Issues

- No validation on form entries
- OpenWQeatherApi Reading may not have correct Icon

## Sources

| Source                                                                                          | Usage                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| <https://stackoverflow.com/questions/19300236/ccessing-a-json-property-string-using-a-variable> | Used for Trends - how to lookup JSON synamically                                                                                |
| <https://bobbyhadz.com/blog/javascript-remove-focus-from-element>                               | arrow anim would not revert to "Next Trend" if scrolled off after clicking unless you clicked on something else to remove focus |
| <https://esri.github.io/esri-leaflet/examples/reverse-geocoding.html>                           | Reverse geocode lat and long to pick up the county for adding station dynamically                                               |
| <https://leafletjs.com/examples.html>                                                           | Leaflet Documentation                                                                                                           |