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
import DateRangePicker from '../DateRange/DateRangePicker'

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
  const [showData, setShowData] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  })
  const { groupedOrderData, generalOrder } = useContext(AdminContext)
  // Function to filter data by date range
  function filterDataByDateRange(data, startDate, endDate) {
    // Convert start and end dates to Date objects

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    console.log('data', data)
    // Use the filter method to select objects within the date range
    const filteredData = data?.filter((item) => {
      // Convert start and end dates format
      let itemDateArray = item?.date.split('/')
      let newItemDate = `${itemDateArray[1]} / ${itemDateArray[0]}/ ${itemDateArray[2]}
      `
      // Convert the item's date to a Date object
      const itemDate = new Date(newItemDate)
      console.log('itemDate', item?.date)
      console.log('newItemDate', newItemDate)
      console.log('itemDate', itemDate)
      // Check if the item's date is within the selected range
      return itemDate >= startDateObj && itemDate <= endDateObj
    })
    // console.log('filteredData', filteredData)
    // return filteredData.reverse()
    return filteredData
  }

  function clearFilter() {
    setStartDate(null)
    setEndDate(null)
    setFilteredData(null)
    // setShowData(groupedOrderData.data)
  }

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
    // console.log('showData', showData)
    // showData?.forEach((item) => {
    showData?.forEach((item) => {
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
  }, [showData])

  useEffect(() => {
    if (!filteredData) {
      // setShowData(groupedOrderData.data.reverse())
      setShowData(groupedOrderData.data.reverse())
    } else {
      setShowData(filteredData.data.reverse())
    }
  }, [startDate, endDate, filteredData, groupedOrderData])
  // useEffect(() => {
  //   console.log('showData', showData)
  // }, [showData])

  useEffect(() => {
    // console.log('groupedOrderData', groupedOrderData)
    // console.log('data', data)
    if (!startDate || !endDate) return
    const filteredData = filterDataByDateRange(groupedOrderData.data, startDate, endDate)
    // console.log('filteredData', filteredData)
    setFilteredData({ data: filteredData })
  }, [startDate, endDate, groupedOrderData])

  const handleDateChange = (type, date) => {
    if (type === 'start') {
      setStartDate(date)
    } else if (type === 'end') {
      setEndDate(date)
    }
  }
  return (
    <>
      <div className="">
        {/* <h1>Date Range Picker Example</h1> */}
        <div className="d-flex flex-wrap">
          {' '}
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
          />{' '}
          <button
            onClick={() => {
              clearFilter()
            }}
          >
            Clear Filter
          </button>
        </div>
        <p>
          Selected Date Range:{' '}
          {startDate && endDate
            ? `${startDate.toDateString()} - ${endDate.toDateString()}`
            : 'Select a date range'}
        </p>
      </div>
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
