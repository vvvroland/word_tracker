import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { useState } from 'react'




const LineGraph = ({chartData,goal}) => {

    const tempData ={
        labels: chartData.map((data)=> data.day),
        datasets: [{
            label:"Words typed daily",
            data:chartData.map((data)=> data.dailyCount),
            backgroundColor: ["indigo", "blue", "green", "midnightblue"],
            borderColor: "black",
            borderWidth: 2
        },
        {
          label:"Daily Goal",
          data:chartData.map((data)=> goal),
          backgroundColor: ["tomato", "crimson", "chartreuse", "lime"],
          borderColor: "chocolate",
          borderWidth: 2
      }]}

  return (
    <div>
      <Line data={tempData} />
    </div>
  )
}

export default LineGraph