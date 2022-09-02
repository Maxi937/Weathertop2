//Should be able to grab the elements in an array and use them for the chart
let chart = new frappe.Chart("#chart", {
  data: {
    labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],

    datasets: [],

    yMarkers: [{ label: "Marker", value: 70, options: { labelPos: "left" } }],
    yRegions: [{ label: "Region", start: -10, end: 50, options: { labelPos: "right" } }],
  },

  title: "My Awesome Chart",
  type: "axis-mixed", // or 'bar', 'line', 'pie', 'percentage', 'donut'
  height: 300,
  colors: ["purple", "#ffa3ef", "light-blue"],

  tooltipOptions: {
    formatTooltipX: (d) => (d + "").toUpperCase(),
    formatTooltipY: (d) => d + " pts",
  },
});
