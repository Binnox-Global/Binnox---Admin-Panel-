import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js'
import 'chartjs-adapter-moment' // If using Moment.js for time formatting

const data = {
  labels: [
    '2023-08-17',
    '2023-08-23',
    '2023-08-29',
    '2023-08-30',
    '2023-08-31',
    '2023-09-01',
    '2023-09-04',
    '2023-09-05',
    '2023-09-06',
    '2023-09-07',
    '2023-09-08',
    '2023-09-11',
    '2023-09-12',
    '2023-09-13',
    '2023-09-14',
  ],
  datasets: [
    {
      label: 'Data',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [2, 2, 2, 2, 5, 3, 2, 2, 2, 11, 3, 3, 5, 2, 3],
    },
  ],
}

const options = {
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Value',
      },
    },
  },
}

const LineChart = () => {
  return (
    <div>
      chat
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
