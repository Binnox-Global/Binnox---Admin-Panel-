import React from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { AdminContext } from 'src/context/adminContext'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import './Orders.scss'

function Orders() {
  const { orderList } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    let newOrdersList = []
    orderList?.data?.forEach((item) => {
      if (item?.statues === 'Pending' || item?.statues === 'Processing') {
        newOrdersList.push(item)
      }
    })

    setNewOrders(newOrdersList)
  }, [orderList])

  const groupedOrders = newOrders?.reduce((result, order) => {
    // console.log('orderList', newOrders)

    const userId = order?.user?._id
    const userOrders = result?.find((group) => group[0].user?._id === userId)

    if (userOrders) {
      userOrders.push(order)
    } else {
      result.push([order])
    }

    return result
  }, [])
  console.log('groupedOrders', groupedOrders)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Orders</CCardHeader>
          <CCardBody>
            {orderList.loading ? (
              <>loading...</>
            ) : (
              <>
                {newOrders.length <= 0 ? (
                  <>No Order Currently</>
                ) : (
                  <>
                    {' '}
                    {groupedOrders?.map((orders, i) => {
                      return <OrderGroupCard key={i} orders={orders} />
                    })}
                  </>
                )}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Orders

function OrderGroupCard({ orders }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const { updateOrderStatusFunction, decodeDate } = React.useContext(AdminContext)
  return (
    <div className="OrderGroupCard">
      {/* OrderGroupCard */}
      <div className="head" onClick={() => setShowDropDown(!showDropDown)}>
        <div className="d-flex gap-3">
          <CAvatar
            size="md"
            // src={item?.user?.user_avatar}
            src="https://via.placeholder.com/600x400?text=Image"
            status={'success'}
          />
          <div className="user-name">
            {orders[0]?.user?.full_name}
            <br />
            <b>Email:</b> {orders[0]?.user?.email} || <b>Contact:</b>{' '}
            {orders[0]?.user?.phone_number}
          </div>
        </div>
        <div className="user-name">
          {' '}
          {orders[0]?.address?.split(',')[0] &&
          orders[0]?.address?.split(',')[1] &&
          orders[0]?.address?.split(',')[0] !== '' &&
          orders[0]?.address?.split(',')[1] !== '' ? (
            <LocationDropdown
              location={`https://www.google.com/maps/search/?api=1&query=${
                orders[0]?.address?.split(',')[0]
              },${orders[0]?.address?.split(',')[1]}`}
            />
          ) : (
            'Location not valid'
          )}
        </div>
      </div>
      <div
        className="dropdown"
        style={
          showDropDown
            ? { display: 'inline-flex' }
            : {
                display: 'none',
              }
        }
      >
        <CTable
          align="middle"
          className="mb-0 border"
          hover
          responsive
          style={{ overflow: 'visible' }}
        >
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Product</CTableHeaderCell>
              <CTableHeaderCell className="text-center">BusinessLocation</CTableHeaderCell>
              <CTableHeaderCell>Count</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
              <CTableHeaderCell>Statues</CTableHeaderCell>
              <CTableHeaderCell style={{ minWidth: '150px', textAlign: 'center' }}>
                Delivery Fee
              </CTableHeaderCell>
              <CTableHeaderCell style={{ minWidth: '150px', textAlign: 'center' }}>
                Service Fee
              </CTableHeaderCell>
              <CTableHeaderCell>Time</CTableHeaderCell>
              <CTableHeaderCell>30 minutes Delay CountDown</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {orders?.map((item, index) => {
              if (item?.statues === 'Pending' || item?.statues === 'Processing') {
                return (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell style={{ minWidth: '160px' }}>
                      <div>{item?.product?.name}</div>
                      <div className="small text-medium-emphasis">
                        <b>Business</b>: {item?.business?.business_name} <br /> <b>Contact</b>:{' '}
                        {item?.business?.business_number}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {item?.business?.business_location?.lat &&
                      item?.business?.business_location?.long &&
                      item?.business?.business_location?.lat !== '' &&
                      item?.business?.business_location?.long !== '' ? (
                        <LocationDropdown
                          location={`https://www.google.com/maps/search/?api=1&query=${item?.business?.business_location?.lat},${item?.business?.business_location?.long}`}
                        />
                      ) : (
                        'Location not valid'
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.item_count}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>₦{item?.item_amount}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item?.statues}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>₦{item?.delivery_fee || '--'}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>₦{item?.service_fee || '--'}</div>
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      <div>{item?.delivered ? 'Delivered' : 'Not delivered'}</div>
                    </CTableDataCell> */}
                    <CTableDataCell style={{ minWidth: '156px' }}>
                      <div>{decodeDate(item?.createdAt)[1]}</div>
                      <div className="small text-medium-emphasis">
                        {decodeDate(item?.createdAt)[0]}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CountdownTimer createdAt={item?.createdAt} />
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="primary">Actions</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem
                            onClick={() => updateOrderStatusFunction(item?._id, 'Pending')}
                          >
                            Pending
                          </CDropdownItem>
                          <CDropdownItem
                            onClick={() => updateOrderStatusFunction(item?._id, 'Picked up')}
                          >
                            Picked up
                          </CDropdownItem>
                          <CDropdownItem
                            onClick={() => updateOrderStatusFunction(item?._id, 'Delivered')}
                          >
                            Delivered
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                )
              }
            })}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
}

export function OrdersPickedUp() {
  const { orderList, updateOrderStatusFunction, decodeDate } = React.useContext(AdminContext)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Orders Picked up</CCardHeader>
          <CCardBody>
            {/* <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                label="Radio 1"
                defaultChecked
              />
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                label="Radio 2"
              />
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                label="Radio 3"
              />
            </CButtonGroup> */}
            <CTable
              align="middle"
              className="mb-0 border"
              hover
              responsive
              style={{ overflow: 'visible' }}
            >
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">BusinessLocation</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Customer Location</CTableHeaderCell>
                  <CTableHeaderCell>Count</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell>Statues</CTableHeaderCell>
                  <CTableHeaderCell>Rider</CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Time</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {orderList.data.map((item, index) => {
                      if (item.statues === 'Picked up') {
                        return (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">
                              <CAvatar
                                size="md"
                                // src={item?.user?.user_avatar}
                                src="https://via.placeholder.com/600x400?text=Image"
                                status={'success'}
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>{item?.user?.full_name}</div>
                              <div className="small text-medium-emphasis">
                                Email: {item?.user?.email} || Contact: {item?.user?.phone_number}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.product?.name}</div>
                              <div className="small text-medium-emphasis">
                                Business: {item?.business?.business_name}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {item?.business?.business_location?.lat &&
                              item?.business?.business_location?.long &&
                              item?.business?.business_location?.lat !== '' &&
                              item?.business?.business_location?.long !== '' ? (
                                <LocationDropdown
                                  location={`https://www.google.com/maps/search/?api=1&query=${item?.business?.business_location?.lat},${item?.business?.business_location?.long}`}
                                />
                              ) : (
                                'Location not valid'
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {/* <CIcon size="xl" icon={item?.address} title={item?.country?.name} /> */}
                              {item?.address.split(',')[0] &&
                              item?.address.split(',')[1] &&
                              item?.address.split(',')[0] !== '' &&
                              item?.address.split(',')[1] !== '' ? (
                                <LocationDropdown
                                  location={`https://www.google.com/maps/search/?api=1&query=${
                                    item?.address.split(',')[0]
                                  },${item?.address.split(',')[1]}`}
                                />
                              ) : (
                                'Location not valid'
                              )}
                              {/* {console.log(item?.address.split(''))} */}
                              <div></div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.item_count}</div>
                              {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {/* <CIcon size="xl" icon={item?.item_amount} /> */}
                              <div>₦{item?.item_amount}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> */}
                              <div>{item?.statues}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> */}
                              <div>{item?.delivered ? 'Delivered' : 'Not delivered'}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> */}
                              <div>{item?.received ? 'Received' : 'Not received'}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{decodeDate(item?.createdAt)[1]}</div>
                              <div className="small text-medium-emphasis">
                                Date: {decodeDate(item?.createdAt)[0]}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CDropdown variant="btn-group">
                                <CDropdownToggle color="primary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem
                                    onClick={() => updateOrderStatusFunction(item?._id, 'Pending')}
                                  >
                                    Pending
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() =>
                                      updateOrderStatusFunction(item?._id, 'Picked up')
                                    }
                                  >
                                    Picked up
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() =>
                                      updateOrderStatusFunction(item?._id, 'Delivered')
                                    }
                                  >
                                    Delivered
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      }
                    })}
                  </>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export function OrdersDelivered() {
  const { orderList, updateOrderStatusFunction, decodeDate } = React.useContext(AdminContext)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Orders Picked up</CCardHeader>
          <CCardBody>
            <CTable
              align="middle"
              className="mb-0 border"
              hover
              responsive
              style={{ overflow: 'visible' }}
            >
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">BusinessLocation</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Customer Location</CTableHeaderCell>
                  <CTableHeaderCell>Count</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell>Statues</CTableHeaderCell>
                  {/* <CTableHeaderCell>Rider</CTableHeaderCell> */}
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '100px', textAlign: 'center' }}>
                    delivery_fee
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '100px', textAlign: 'center' }}>
                    service_fee
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '150px' }}>Time</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {orderList.data.map((item, index) => {
                      if (item.statues === 'Delivered') {
                        return (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">
                              <CAvatar
                                size="md"
                                // src={item?.user?.user_avatar}
                                src="https://via.placeholder.com/600x400?text=Image"
                                status={'success'}
                              />
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>{item?.user?.full_name}</div>
                              <div className="small text-medium-emphasis">
                                Email: {item?.user?.email} || Contact: {item?.user?.phone_number}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.product?.name}</div>
                              <div className="small text-medium-emphasis">
                                Business: {item?.business?.business_name}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {item?.business?.business_location?.lat &&
                              item?.business?.business_location?.long &&
                              item?.business?.business_location?.lat !== '' &&
                              item?.business?.business_location?.long !== '' ? (
                                <LocationDropdown
                                  location={`https://www.google.com/maps/search/?api=1&query=${item?.business?.business_location?.lat},${item?.business?.business_location?.long}`}
                                />
                              ) : (
                                'Location not valid'
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {/* <CIcon size="xl" icon={item?.address} title={item?.country?.name} /> */}
                              {item?.address.split(',')[0] &&
                              item?.address.split(',')[1] &&
                              item?.address.split(',')[0] !== '' &&
                              item?.address.split(',')[1] !== '' ? (
                                <LocationDropdown
                                  location={`https://www.google.com/maps/search/?api=1&query=${
                                    item?.address.split(',')[0]
                                  },${item?.address.split(',')[1]}`}
                                />
                              ) : (
                                'Location not valid'
                              )}
                              {/* {console.log(item?.address.split(''))} */}
                              <div></div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.item_count}</div>
                              {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {/* <CIcon size="xl" icon={item?.item_amount} /> */}
                              <div>₦{item?.item_amount}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> */}
                              <div>{item?.statues}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> */}
                              <div>{item?.delivered ? 'Delivered' : 'Not delivered'}</div>
                            </CTableDataCell>
                            {/* <CTableDataCell>
                              {/* <div className="small text-medium-emphasis">Last login</div> * /}
                              <div>{item?.received ? 'Received' : 'Not received'}</div>
                            </CTableDataCell> */}
                            <CTableDataCell className="text-center">
                              <div>₦{item?.delivery_fee || '--'}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div>₦{item?.service_fee || '--'}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{decodeDate(item?.createdAt)[1]}</div>
                              <div className="small text-medium-emphasis">
                                {decodeDate(item?.createdAt)[0]}
                              </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <CDropdown variant="btn-group">
                                <CDropdownToggle color="primary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem
                                    onClick={() => updateOrderStatusFunction(item?._id, 'Pending')}
                                  >
                                    Pending
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() =>
                                      updateOrderStatusFunction(item?._id, 'Picked up')
                                    }
                                  >
                                    Picked up
                                  </CDropdownItem>
                                  <CDropdownItem
                                    onClick={() =>
                                      updateOrderStatusFunction(item?._id, 'Delivered')
                                    }
                                  >
                                    Delivered
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </CTableDataCell>
                          </CTableRow>
                        )
                      }
                    })}
                  </>
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
export function LocationDropdown({ location }) {
  async function copyLocation(link) {
    // return console.log(link)
    try {
      await navigator.clipboard.writeText(link)
      toast.info('Link Copied')
    } catch {
      toast.error('Error copying link')
    }
  }
  function openMapLocation(link) {
    window.open(link)
  }
  return (
    <CDropdown variant="btn-group">
      <CDropdownToggle color="">Location</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={() => openMapLocation(location)}>Open Map</CDropdownItem>
        <CDropdownItem onClick={() => copyLocation(location)}>Copy Link</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

// export function CountDown({ time }) {
//   const [timeLeft, setTimeLeft] = React.useState(null)
//   useEffect(() => {
//     // const second = 1000,
//     //   minute = second * 60,
//     //   hour = minute * 60,
//     //   day = hour * 24

//     // console.log(time)
//     // // let gmonth = "jan";
//     // // let gday = "01";
//     // // let gyear = "2023";
//     // // let gtime = "00:00:00";
//     // // console.log(userInvestment?.endDate);
//     // let countTill = time,
//     //   // let countTill = `${gmonth} ${gday} , ${gyear} ${gtime}`,
//     //   // let newyear = "April 12, 2001 00:00:00",
//     //   countDown = new Date(countTill).getTime()
//     // console.log(countDown)
//     // const intervalId = setInterval(() => {
//     //   let now = new Date().getTime(),
//     //     distance = now - countDown

//     //   // console.log(distance)
//     //   let calculatedDate = {
//     //     days: Math.floor(distance / day),
//     //     hours: Math.floor((distance % day) / hour),
//     //     minutes: Math.floor((distance % hour) / minute),
//     //     seconds: Math.floor((distance % minute) / second),
//     //   }
//     // console.log(calculatedDate)

//     // setInvestmentTime(calculatedDate)
//     // }, 1000)

//     // return () => {
//     //   clearInterval(intervalId) //This is important
//     // }

//     // var d = new Date(time)
//     // d.setHours(d.getHours() + 5)
//     // d.setMinutes(d.getMinutes() + 30)

//     // console.log(d)

//     // let dateNow = new Date().getTime()
//     // let calTime = dateNow + 30 * 60 * 1000
//     let dt = new Date()
//     dt = new Date(dt.getTime() + 30 * 60 * 1000)

//     console.log('calTime', dt.toLocaleTimeString())
//   }, [timeLeft])

//   return <>0</>
// }

function CountdownTimer({ createdAt }) {
  const endTime = new Date(createdAt).getTime() + 30 * 60 * 1000 // endTime is 30 minutes after the given time
  const [remainingTime, setRemainingTime] = useState(0)
  const [delayTime, setDelayTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime - now
      const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let calculatedDelayTimeDistance = now - endTime
      let calculatedDelayTimeMinutes = Math.floor(
        (calculatedDelayTimeDistance % (1000 * 60 * 60)) / (1000 * 60),
      )

      // console.log()

      setDelayTime(calculatedDelayTimeMinutes)
      setRemainingTime(remainingMinutes)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [endTime])
  // useEffect(() => {
  //   console.log('remainingTime', remainingTime)
  //   console.log('delayTime', delayTime)
  // }, [remainingTime])

  return (
    <div>
      {remainingTime <= 0 ? (
        <div className="text-red" style={{ color: 'red' }}>
          {delayTime} minutes
          <div className="small " style={{ color: 'red' }}>
            Delayed
          </div>
        </div>
      ) : (
        <div>{remainingTime} minutes left</div>
      )}
    </div>
  )
}

LocationDropdown.propTypes = {
  location: PropTypes.string,
}
CountdownTimer.propTypes = {
  createdAt: PropTypes.string,
}
OrderGroupCard.propTypes = {
  orders: PropTypes.array,
}
