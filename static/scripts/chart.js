"use strict";

const chart = {
  getLabels(readings) {
    const labels = [];

    for (const reading of readings) {
      const date = new Date(reading.date);
      labels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
    }
    return labels;
  },

  getDataSet(readings, chartToShow) {
    const dataSet = [];

    for (const reading of readings) {
      dataSet.push(reading[chartToShow]);
    }
    return dataSet;
  },

  createChart(readings, chartLookup) {
    const labels = this.getLabels(readings);
    const dataSet = this.getDataSet(readings, chartLookup.chart);

    const data = {
      labels: labels,
      datasets: [
        {
          name: `${chartLookup.title}`,
          type: "line",
          values: dataSet,
        },
      ],
    };
    new frappe.Chart("#chart", {
      title: `${chartLookup.title} Trend`,
      data: data,
      type: "line",
      height: 250,
    });
  },
};
