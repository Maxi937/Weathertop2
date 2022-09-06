
const chart = {
  parseDataLabels(dataLabels){
    const labels = [];

    for(const dataLabel of dataLabels){
      labels.push(`${dataLabel},`) 
    }
    return labels
  },

  createChart(dataLabels, dataSet){
    console.log(dataSet)

    const labels =  this.parseDataLabels(dataLabels)

    data = {
      labels: labels,
      datasets: [
        { 
          name: "Temperature", 
          type: "line",
          values: dataSet
          }
        ]
      };
      new frappe.Chart("#chart", {
        title: "Temperature Trend",
        data: data,
        type: "line",
        height: 250
      });
  }




}
