import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import LineChart from 'src/components/Chart/LineChat'
import { ChartTest } from 'src/components/Chart/ChartTest'
import { useCookies } from 'react-cookie'
import moment from 'moment'
import DateRangePicker from 'src/components/DateRange/DateRangePicker'
import './AdminRecordPage.scss'

function AdminRecordPage() {
  const { adminRecords, adminDailyRecords } = useContext(AdminContext)
  const [adminAccess, setAdminAccess] = useState(false)

  function checkAdminAccess() {
    const userInput = window.prompt('Enter Admin Access Code')
    if (userInput !== null) {
      if (userInput.trim() === '') {
        return alert('Enter An Admin Access Code')
      }

      if (userInput !== 'victor') {
        return alert('Invalid Admin Access Code')
      }
      setAdminAccess(true)
    } else {
      setAdminAccess(false)
      alert('Enter Admin Access Code')
    }
  }

  const [showData, setShowData] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [filteredData, setFilteredData] = useState(null)
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  })

  function clearFilter() {
    setStartDate(null)
    setEndDate(null)
    setFilteredData(null)
    // setShowData(adminDailyRecords.data)
  }
  const handleDateChange = (type, date) => {
    if (type === 'start') {
      setStartDate(date)
    } else if (type === 'end') {
      if (!startDate) {
        return setStartDate(date)
      }
      setEndDate(date)
    }
  }
  useEffect(() => {
    if (!filteredData) {
      console.log(adminDailyRecords)
      // setShowData(adminDailyRecords.data.reverse())
      setShowData(adminDailyRecords.data.reverse())
    } else {
      setShowData(filteredData.data.reverse())
    }
  }, [startDate, endDate, filteredData, adminDailyRecords])
  useEffect(() => {
    // Filter data when startDate and endDate are set
    if (startDate && endDate) {
      const filtered = adminDailyRecords.data.filter((item) => {
        const itemDate = new Date(item.createdAt)
        return itemDate >= startDate && itemDate <= endDate
      })
      console.log('filtered', filtered)
      // setFilteredData(filtered)
    }
  }, [adminDailyRecords, startDate, endDate])

  return (
    <>
      <ExpandableCardComponent title="Transaction Chart">
        <ChartTest />
      </ExpandableCardComponent>
      <ExpandableCardComponent title="User Analysis">
        <UserAnalysisComponent />
      </ExpandableCardComponent>
      <CRow>
        <CCol xs>
          <ExpandableCardComponent title="Admin Record">
            <CCardBody>
              {adminDailyRecords.loading ? (
                <>Loading...</>
              ) : (
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
                  {/* {console.log('showData', showData)} */}
                  {showData?.map((record, i) => {
                    // console.log(record)
                    return (
                      <div key={i} className="card p-3 my-2">
                        <b>
                          {moment(record.corrected_data || record?.createdAt).format(
                            'ddd, MMM Do YYYY h:mm a',
                          )}
                        </b>
                        <div className="d-flex gap-5 justify-content-between mt-1">
                          <div className="d-flex gap-5 mt-1">
                            <div className="d-flex flex-column text-center">
                              <b>Order:</b> {record.total_order.toLocaleString()}
                            </div>
                            <div className="d-flex flex-column text-center">
                              <b>Amount:</b> {record.sub_total_order_amount.toLocaleString()}
                            </div>
                            <div className="d-flex flex-column text-center">
                              <b>Service:</b> {record.total_service_fee.toLocaleString()}
                            </div>
                            <div className="d-flex flex-column text-center">
                              <b>Delivery:</b> {record.total_delivery_fee.toLocaleString()}
                            </div>
                          </div>
                          <div className="d-flex gap-2 mt-1">
                            <div className="d-flex flex-column text-center">
                              <b>User</b> {record.current_user_service_charge}%
                            </div>
                            <div className="d-flex flex-column text-center">
                              <b>Business</b> {record.current_business_service_charge}%
                            </div>
                            <div className="d-flex flex-column text-center">
                              <b>Rider</b> {record.current_delivery_charge}%
                            </div>
                            {/* <div className="d-flex flex-column text-center">
                                <b>Delivery</b> {record.total_delivery_fee.toLocaleString()}
                              </div> */}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </CCardBody>
          </ExpandableCardComponent>
        </CCol>
      </CRow>{' '}
      {/* {adminAccess && (
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              {' '}
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  Admin Record
                  {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> * /}
                  <button className="btn btn-sm btn-primary" onClick={() => setAdminAccess(false)}>
                    {' '}
                    Hide Full Record{' '}
                  </button>
                </div>
              </CCardHeader>
              <CCardBody>
                {adminRecords.loading ? (
                  <>Loading...</>
                ) : (
                  <div className="row">
                    <div className="col-md-6 my-2">
                      <b>Total Service Fee</b> <br />₦{' '}
                      {adminRecords.totalServiceFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Delivery Fee</b> <br />₦{' '}
                      {adminRecords.totalDeliveryFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Transaction</b> <br />₦{' '}
                      {adminRecords.totalTransactions.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>5% of Transaction</b> <br />₦{' '}
                      {adminRecords.transactions5percent.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Ground Total</b> <br />₦ {adminRecords.groundTotal.toLocaleString()}
                    </div>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )} */}
    </>
  )
}

export default AdminRecordPage

export function SubmitRecordPage() {
  const { referralOrderGrouping, setModalComponentVisible, apiUrl } = useContext(AdminContext)
  const [record, setRecord] = useState({
    todayOrderCount: 0,
    totalPrice: 0,
    totalServiceFee: 0,
    totalDelivery: 0,
  })
  const [cookies] = useCookies()
  useEffect(() => {
    // console.log(referralOrderGrouping)
    let total_service_fee = 0
    let total_delivery_fee = 0
    let sub_total_order_amount = 0
    referralOrderGrouping?.ordersMadeToday?.forEach((order) => {
      total_service_fee += order.service_fee
      total_delivery_fee += order.delivery_fee
      sub_total_order_amount += order.sub_total
    })

    setRecord({
      todayOrderCount: referralOrderGrouping?.ordersMadeToday.length,
      totalPrice: sub_total_order_amount,
      totalServiceFee: total_service_fee,
      totalDelivery: total_delivery_fee,
    })

    // console.log({ referralOrderGrouping })

    // console.log({
    //   order: referralOrderGrouping?.ordersMadeToday.length,
    //   total_service_fee,
    //   total_delivery_fee,
    //   sub_total_order_amount,
    // })
  }, [referralOrderGrouping])

  function closeDayRecordFunction() {
    if (!window.confirm('Are you sure you want to close record for today')) {
      return setModalComponentVisible(false)
    }
    // axios Get request
    const options = {
      url: `${apiUrl}/admin/end_the_day`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: cookies?.BinnoxAdmin?.token,
      },
    }
    // setLoading(false)
    // return console.log(data)

    axios(options)
      .then((response) => {
        console.log(response.data)
        toast.success('Record Saved')
        setModalComponentVisible(false)
      })
      .catch((error) => {
        // setLoading(false)
        // console.log(error)
        if (error.response.status || error.response.status === 400) {
          setModalComponentVisible(false)
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          setModalComponentVisible(false)
          return toast.error(error.response.data.message)
        }
        toast.error(error.message)
      })
  }
  return (
    <>
      <h3>Confirm Today Order Record</h3>

      <div className="row">
        <div className="col-md-6 mt-3">
          <b>Total Order</b> <br />
          {record.todayOrderCount}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Service Fee</b> <br />₦ {record.totalServiceFee.toLocaleString()}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Delivery fee</b> <br />₦ {record.totalDelivery.toLocaleString()}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Product Price</b> <br />₦ {record.totalPrice.toLocaleString()}
        </div>
      </div>

      <div className="mt-5">
        <button className="btn btn- btn-primary" onClick={() => closeDayRecordFunction()}>
          Close Record For today
        </button>
      </div>
    </>
  )
}

export function ExpandableCardComponent(props) {
  const [open, setOpen] = useState(false)
  return (
    <CCard className="mb-4">
      {' '}
      <CCardHeader>
        <div className="d-flex justify-content-between">
          {props.title}
          <button className="btn btn-primary btn-sm" onClick={() => setOpen(!open)}>
            Expand
          </button>
        </div>
      </CCardHeader>
      {open && <> {props.children}</>}
    </CCard>
  )
}

function UserAnalysisComponent() {
  const { token, setOrderList, orderGroupList, orderList, setOrderGroupTransferList } =
    useContext(AdminContext)

  const [groupOrderByUser, setGroupOrderByUser] = useState(null)
  const [groupedOrdersByBusiness, setGroupedOrdersByBusiness] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedBusiness, setSelectedBusiness] = useState(null)

  const handleUserClick = (userId) => {
    setSelectedUserId(userId)
  }

  useEffect(() => {
    if (orderGroupList.loading) return
    // console.log('UserAnalysisComponent', { orderGroupList })

    const groupOrder = groupOrdersByUser(orderGroupList.data)
    // console.log('UserAnalysisComponent', { groupOrder })
    setGroupOrderByUser(groupOrder)
  }, [orderGroupList])

  const groupOrdersByBusiness = () => {
    const selectedUserId = selectedUser._id
    if (!selectedUserId) return {}

    const userOrders = groupOrderByUser[selectedUserId].orders
    const groupedOrders = {}

    userOrders.forEach((order) => {
      // Check if order.business is defined
      if (!order.business) return // Skip this iteration if business is not defined

      const businessId = order.business._id
      if (!businessId) return // Skip this iteration if businessId is not defined

      if (!groupedOrders[businessId]) {
        groupedOrders[businessId] = {
          business: order.business,
          orders: [order],
          totalAmount: order.total_amount,
          orderDays: [new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'long' })],
        }
      } else {
        groupedOrders[businessId].orders.push(order)
        groupedOrders[businessId].totalAmount += order.total_amount
        const orderDay = new Date(order.createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
        })
        if (!groupedOrders[businessId].orderDays.includes(orderDay)) {
          groupedOrders[businessId].orderDays.push(orderDay)
        }
      }
    })

    return groupedOrders
  }

  useEffect(() => {
    if (!selectedUser) return
    console.log('UserAnalysisComponent', { selectedUser })
    const groupedOrdersByBusiness = groupOrdersByBusiness()

    console.log('UserAnalysisComponent', { groupedOrdersByBusiness })
    setGroupedOrdersByBusiness(groupedOrdersByBusiness)
  }, [selectedUser])

  const groupOrdersByUser = (orders) => {
    const groupedOrders = {}

    orders.forEach((order) => {
      const userId = order.user._id
      if (!groupedOrders[userId]) {
        groupedOrders[userId] = {
          user: order.user,
          orders: [order],
        }
      } else {
        groupedOrders[userId].orders.push(order)
      }
    })

    return groupedOrders
  }
  return (
    <div className="UserAnalysisComponent">
      <div>
        {groupOrderByUser === null ? (
          <>Loading .....</>
        ) : (
          <>
            {Object.values(groupOrderByUser).map((userOrders) => (
              <div key={userOrders.user._id} onClick={() => setSelectedUser(userOrders.user)}>
                <div className="userInfoCard">
                  <h3>{userOrders.user.full_name}</h3>
                  <span className="">{userOrders.orders.length}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div>
        {selectedUser && (
          <div className="userRecordDetail">
            <div className="top-section">
              <h2> {selectedUser.full_name}</h2>

              <div className="top-card-group">
                <div className="card">
                  <b>Total Order</b>
                  10
                </div>
                <div className="card">
                  <b>Total used restaurant</b>
                  10
                </div>
                <div className="card">
                  <b>Total Amount Spent</b>
                  10
                </div>
              </div>
            </div>
            <h2>Orders by Business</h2>
            <div className="business-section">
              {groupedOrdersByBusiness && (
                <div className="business-list">
                  <div
                    className="business-name-tab bg-danger text-white"
                    onClick={() => setSelectedBusiness(null)}
                  >
                    X
                  </div>
                  {Object.values(groupedOrdersByBusiness).map((businessOrders) => (
                    <div
                      className={`business-name-tab ${
                        selectedBusiness?.business._id === businessOrders?.business._id
                          ? ' selected'
                          : ''
                      }`}
                      key={businessOrders.business._id}
                      onClick={() => setSelectedBusiness(businessOrders)}
                    >
                      {businessOrders.business.business_name} ({businessOrders.orders.length})
                    </div>
                  ))}
                  {selectedBusiness && (
                    <div className="business-details">
                      <hr />
                      <b>{selectedBusiness.business.business_name}</b>
                      <p>Total Orders: {selectedBusiness.orders.length}</p>
                      <p>Total Amount Spent: {selectedBusiness.totalAmount}</p>
                      <p>Order Days: {selectedBusiness.orderDays.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}