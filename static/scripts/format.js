"use strict";

function formatLatLong() {
  var formatArray = document.getElementsByClassName("FormatMe");

  for (const element of formatArray) {
    const result = Number(element.innerHTML).toFixed(2);
    element.innerHTML = result;
  }
}

function formatDate() {
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
