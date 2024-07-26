import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useState } from 'react'




const BarGraph = ({ chartData, goal }) => {

  const tempData = {
    labels: chartData.map((data) => data.day),
    datasets: [{
      label: "Total words typed",
      data: chartData.map((data) => data.totalCount),
      backgroundColor: ["indigo", "blue", "green", "midnightblue"],
      borderColor: "black",
      borderWidth: 2
    },
    {
      label: "Running Goal",
      data: chartData.map((data) => data.day * goal),
      backgroundColor: ["tomato", "yellow", "orange", "pink"],
      borderColor: "black",
      borderWidth: 2
    }]
  }

  return (
    <div>
      <Bar data={tempData} />
    </div>
  )
}

export default BarGraph
