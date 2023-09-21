import React, { useContext, useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-moment' // Import the 'chartjs-adapter-moment'
// import faker from 'faker'
import { faker } from '@faker-js/faker'
import { AdminContext } from 'src/context/adminContext'
import moment from 'moment'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Transaction',
    },
  },
  scales: {
    x: {
      // type: 'time', // Use a time scale for the x-axis
      // time: {
      //   unit: 'day', // Display data by day
      // },
    },
    y: {
      beginAtZero: true,
    },
  },
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
// // console.log(faker.datatype.number({ min: -1000, max: 1000 }))
// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [100, 655, 333, 444, 366, 221, 445],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//     {
//       label: 'Dataset 3',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// }

export function ChartTest() {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  })
  const { groupedOrderData, generalOrder } = useContext(AdminContext)

  useEffect(() => {
    // console.log('groupedOrderData', groupedOrderData)

    let labelsArray = []
    let dataSetsArray = []

    // console.log(groupedOrderData.data)
    // console.log('groupedOrderData', groupedOrderData.data)
    // console.log('generalOrder', generalOrder.data)

    let dataSetsArrayDataOrderCount = []
    let dataSetsArrayDataTotalAmount = []
    let labelsArrayData = []

    groupedOrderData?.data?.reverse()?.forEach((item) => {
      // console.log(item)
      let rearrangeDateArray = item?.date.split('/')
      let rearrangeDate = `${rearrangeDateArray[1]}/${rearrangeDateArray[0]}/${rearrangeDateArray[2]}`
      // console.log(rearrangeDate)
      labelsArray.push(moment(rearrangeDate).format('MMM Do'))
      // labelsArray.push(item.date)
      dataSetsArrayDataOrderCount.push(item.orderCount)
      dataSetsArrayDataTotalAmount.push(item.totalAmount)
    })
    dataSetsArray.push({
      label: 'Count',
      data: dataSetsArrayDataOrderCount,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })
    dataSetsArray.push({
      label: 'Total',
      data: dataSetsArrayDataTotalAmount,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })

    // groupedOrderData?.data?.forEach((item) => {
    //   labelsArray.push(item.date)
    // })

    // console.log('labelsArray', labelsArray)
    // console.log('dataSetsArray', dataSetsArray)

    setData({
      labels: labelsArray,
      datasets: dataSetsArray,
    })
  }, [groupedOrderData])
  useEffect(() => {
    // console.log('data', data)
  }, [data])
  return (
    <>
      <Line options={options} data={data} />
      {/* {data.datasets.forEach((count, i) => {
        return (
          <>
          </>
        )
      })} */}
    </>
  )
}
