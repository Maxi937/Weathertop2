
const chart = {
  getLabels(readings){
    const labels = [];

    for(const reading of readings){
      const date = new Date(reading.date)
      labels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
    }
    return labels
  },

  getDataSet(readings, chartToShow){
    const dataSet = []

    for (const reading of readings){
      dataSet.push(reading[chartToShow])
    }
    //console.log(dataSet)
    return dataSet
  },

  createChart(readings, chartToShow){
    const labels =  this.getLabels(readings)
    const dataSet = this.getDataSet(readings, chartToShow)

    data = {
      labels: labels,
      datasets: [
        { 
          name: `${chartToShow}`, 
          type: "line",
          values: dataSet
          }
        ]
      };
      new frappe.Chart("#chart", {
        title: `${chartToShow} Trend`,
        data: data,
        type: "line",
        height: 250
      });
  }
}
