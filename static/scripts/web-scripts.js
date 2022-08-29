"use strict";
//These scripts are declared in "main.hbs" under layouts.
//app.use(express.static("./static/")) is used in server.js so node app can serve the folder.


/**** 
* Format lat and longitude, editing JSON, previously done by editing JSON data in station
* object, but this had the effect of changing the original data if any function was called
* that used collection.save - eg. add.Reading()
****/
function formatLatLong() {
  
  var formatArray = document.getElementsByClassName("FormatMe");

  for (const element of formatArray) {
    const result = Number(element.innerHTML).toFixed(2);
    element.innerHTML = result;
  }
}

/***
* Format dates in readings table, could not do it by editing data, edited dates
* would be in JSON Data on Reresh of page and when conversion ran again would error
***/
function formatDate() {
  console.log("heeloo")
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  var dateArray = document.getElementsByClassName("date");
  for (const element of dateArray) {
    element.innerHTML = new Date(element.innerHTML.trim()).toLocaleDateString("en-ie", dateOptions);
  }
}
