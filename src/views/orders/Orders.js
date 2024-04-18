import React, { useContext } from 'react'
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'
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
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
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
import moment from 'moment'
import './Orders.scss'
import { GetLocation } from '../records/BusinessRecords'
import { SocketContext } from 'src/context/socketContext'

function Orders() {
  const { adminGetOrdersSocketFunction } = React.useContext(SocketContext)
  const { orderGroupList } = React.useContext(AdminContext)
  // const [newOrders, setNewOrders] = useState({
  //   new: [],
  //   accepted: [],
  //   pickedUp: [],
  // })
  // // console.log({ orderGroupList })
  // useEffect(() => {
  //   let newOrdersList = []
  //   let acceptedOrdersList = []
  //   let pickedUpOrdersList = []
  //   orderGroupList?.data?.forEach((item) => {
  //     console.log('item?.statues ', item.statues)
  //     if (item?.statues === 'Pending') {
  //       newOrdersList.push(item)
  //     }
  //     if (item?.statues === 'Processing') {
  //       acceptedOrdersList.push(item)
  //     }
  //     if (item.statues === 'Picked up') {
  //       pickedUpOrdersList.push(item)
  //     }
  //   })

  //   setNewOrders({
  //     new: newOrdersList,
  //     accepted: acceptedOrdersList,
  //     pickedUp: pickedUpOrdersList,
  //   })
  // }, [orderGroupList])

  useEffect(() => {
    adminGetOrdersSocketFunction()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              Orders
              <button className="btn btn-sm btn-primary">Reload</button>
            </CCardHeader>
            <CCardBody>
              <OrderTabComponent orderGroupList={orderGroupList} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Orders

function OrderTabComponent({ orderGroupList }) {
  // console.log('OrderTabComponent', orderGroupList)
  const [activeKey, setActiveKey] = useState(0)
  const [tabHeader, setTabHeader] = useState([
    {
      name: 'Pending',
      statues: 'Pending',
      data: [],
    },
    {
      name: 'Processing',
      statues: 'Processing',
      data: [],
    },
    {
      name: 'Assigned',
      statues: 'Assigned',
      data: [],
    },
    {
      name: 'Delivered',
      statues: 'Delivered',
      data: [],
    },
    // {
    //   name: 'Completed',
    //   statues: 'Completed',
    //   data: [],
    // },
  ])
  useEffect(() => {
    // console.log('first', { data: orderGroupList.data })
    const pendingOrders = []
    const processingOrders = []
    const assignedOrders = []
    const deliveredOrders = []
    const completedOrders = []
    orderGroupList?.data?.map((order, i) => {
      if (order.statues === 'Pending') {
        pendingOrders.push(order)
      }
      if (order.statues === 'Processing') {
        console.log(order)
        processingOrders.push(order)
      }
      if (order.statues === 'Assigned') {
        assignedOrders.push(order)
      }
      if (order.statues === 'Delivered' || order.statues === 'Completed') {
        deliveredOrders.push(order)
      }
      // if (order.statues === 'Completed') {
      //   completedOrders.push(order)
      // }
    })
    // Update the state with the new counts
    setTabHeader((prevTabHeader) => [
      { ...prevTabHeader[0], count: pendingOrders.length, data: pendingOrders },
      { ...prevTabHeader[1], count: processingOrders.length, data: processingOrders },
      { ...prevTabHeader[2], count: assignedOrders.length, data: assignedOrders },
      { ...prevTabHeader[3], count: deliveredOrders.length, data: deliveredOrders },
      // { ...prevTabHeader[4], count: completedOrders.length, data: completedOrders },
    ])
  }, [orderGroupList])

  return (
    <>
      <CNav variant="pills" role="tablist" className="my-3">
        {tabHeader?.map((tab, i) => {
          return (
            <CNavItem role="presentation" key={`CNav${i}`}>
              <CNavLink
                active={activeKey === i}
                component="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected={activeKey === i}
                onClick={() => setActiveKey(i)}
              >
                {tab.name} <>{tab?.count}</>
              </CNavLink>
            </CNavItem>
          )
        })}
      </CNav>
      <CTabContent className="">
        {tabHeader?.map((tab, i) => {
          return (
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab-pane"
              visible={activeKey === i}
              key={`CTabContent${i}`}
            >
              {orderGroupList.loading ? (
                <>loading...</>
              ) : (
                <>
                  {tab.data?.length <= 0 ? (
                    <>No {tabHeader[i].name} Order Currently</>
                  ) : (
                    <>
                      {/* TODO: this will be a filter for business */}

                      {tab.data?.map((order, i) => {
                        return <OrderGroupCardComponent key={i} order={order} />
                      })}
                    </>
                  )}
                </>
              )}
            </CTabPane>
          )
        })}
      </CTabContent>
    </>
  )
}

export function OrdersGroupDelivered() {
  const { orderGroupList } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    let deliveredOrdersList = []

    orderGroupList?.data?.forEach((item) => {
      if (item?.statues === 'Delivered') {
        // console.log(item)
        deliveredOrdersList.push(item)
      }
    })

    setNewOrders(deliveredOrdersList)
  }, [orderGroupList])

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Orders</CCardHeader>
            <CCardBody>
              {orderGroupList.loading ? (
                <>loading...</>
              ) : (
                <>
                  {newOrders?.length <= 0 ? (
                    <>No Order Currently</>
                  ) : (
                    <>
                      {newOrders?.map((order, i) => {
                        return <OrderGroupCardComponent key={i} order={order} />
                      })}
                    </>
                  )}
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export function NewOrdersTransfer() {
  const { orderTransferList, updateOrderTransferStatusFunction } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  React.useEffect(() => {
    let newOrdersList = []
    orderTransferList?.data?.forEach((item) => {
      if (!item?.transfer_approve && !item.transfer_rejected) {
        // console.log(item)
        newOrdersList.push(item)
      }
    })
    // console.log('orderTransferList', orderTransferList)
    setNewOrders(newOrdersList)
  }, [orderTransferList])

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
  // console.log('groupedOrders', groupedOrders)

  return (
    <>
      {newOrders.length !== 0 && (
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>Old Orders Transfer</CCardHeader>
              <CCardBody>
                {orderTransferList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {newOrders.length <= 0 ? (
                      <>No Order Transfer Currently</>
                    ) : (
                      <>
                        {' '}
                        {groupedOrders?.map((orders, i) => {
                          return <OrderGroupCard key={i} orders={orders} transfer={true} />
                        })}
                      </>
                    )}
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export function NewOrdersGroupTransfer() {
  const { orderGroupTransferList, updateOrderTransferStatusFunction } =
    React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    // let newOrdersList = []
    // console.log(orderGroupTransferList?.data)
    // console.log('orderGroupTransferList', orderGroupTransferList)
    setNewOrders(orderGroupTransferList?.data?.new)
  }, [orderGroupTransferList])

  return (
    <>
      {' '}
      {newOrders?.length !== 0 && (
        // {/* {false && ( */}
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              <CCardHeader>New Orders Group Transfer</CCardHeader>
              <CCardBody>
                {orderGroupTransferList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {newOrders?.length <= 0 ? (
                      <>No Order Transfer Currently</>
                    ) : (
                      <>
                        {' '}
                        {newOrders?.map((orders, i) => {
                          return <OrderGroupCardComponent key={i} order={orders} transfer={true} />
                        })}
                      </>
                    )}
                  </>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export function ApprovedOrdersGroupTransfer() {
  const { orderGroupTransferList, updateOrderTransferStatusFunction } =
    React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    // let newOrdersList = []
    // orderGroupTransferList?.data?.forEach((item) => {
    //   if (item?.transfer_approve && !item.transfer_rejected) {
    //     newOrdersList.push(item)
    //   }
    // })
    // // console.log(orderGroupTransferList)
    setNewOrders(orderGroupTransferList?.data?.accepted)
  }, [orderGroupTransferList])

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
  // console.log('groupedOrders', groupedOrders)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Approved Orders Group Transfer</CCardHeader>
          <CCardBody>
            {orderGroupTransferList.loading ? (
              <>loading...</>
            ) : (
              <>
                {newOrders.length <= 0 ? (
                  <>No Approved Order Transfer Currently</>
                ) : (
                  <>
                    {' '}
                    {newOrders?.map((orders, i) => {
                      return <OrderGroupCardComponent key={i} order={orders} transfer={true} />
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

export function RejectedOrdersGroupTransfer() {
  const { orderGroupTransferList, updateOrderTransferStatusFunction } =
    React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  React.useEffect(() => {
    setNewOrders(orderGroupTransferList?.data?.rejected)
  }, [orderGroupTransferList])

  // const groupedOrders = newOrders?.reduce((result, order) => {
  //   // console.log('orderList', newOrders)

  //   const userId = order?.user?._id
  //   const userOrders = result?.find((group) => group[0].user?._id === userId)

  //   if (userOrders) {
  //     userOrders.push(order)
  //   } else {
  //     result.push([order])
  //   }

  //   return result
  // }, [])
  // console.log('groupedOrders', groupedOrders)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Rejected Orders Transfer</CCardHeader>
          <CCardBody>
            {orderGroupTransferList.loading ? (
              <>loading...</>
            ) : (
              <>
                {newOrders.length <= 0 ? (
                  <>No Rejected Order Transfer Currently</>
                ) : (
                  <>
                    {' '}
                    {newOrders?.map((orders, i) => {
                      return <OrderGroupCardComponent key={i} order={orders} transfer={true} />
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

export function ApprovedOrdersTransfer() {
  const { orderTransferList, updateOrderTransferStatusFunction } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    let newOrdersList = []
    orderTransferList?.data?.forEach((item) => {
      if (item?.transfer_approve && !item.transfer_rejected) {
        newOrdersList.push(item)
      }
    })
    // console.log(orderTransferList)
    setNewOrders(newOrdersList)
  }, [orderTransferList])

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
  // console.log('groupedOrders', groupedOrders)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Approved Orders Transfer</CCardHeader>
          <CCardBody>
            {orderTransferList.loading ? (
              <>loading...</>
            ) : (
              <>
                {newOrders.length <= 0 ? (
                  <>No Approved Order Transfer Currently</>
                ) : (
                  <>
                    {' '}
                    {groupedOrders?.map((orders, i) => {
                      return <OrderGroupCard key={i} orders={orders} transfer={true} />
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

export function RejectedOrdersTransfer() {
  const { orderTransferList, updateOrderTransferStatusFunction } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    let newOrdersList = []
    orderTransferList?.data?.forEach((item) => {
      if (!item?.transfer_approve && item.transfer_rejected) {
        newOrdersList.push(item)
      }
    })
    // console.log(orderTransferList)
    setNewOrders(newOrdersList)
  }, [orderTransferList])

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
  // console.log('groupedOrders', groupedOrders)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Rejected Orders Transfer</CCardHeader>
          <CCardBody>
            {orderTransferList.loading ? (
              <>loading...</>
            ) : (
              <>
                {newOrders.length <= 0 ? (
                  <>No Rejected Order Transfer Currently</>
                ) : (
                  <>
                    {' '}
                    {groupedOrders?.map((orders, i) => {
                      return <OrderGroupCard key={i} orders={orders} transfer={true} />
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

function OrderGroupCard({ orders, transfer }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const { updateOrderStatusFunction, updateOrderTransferStatusFunction, decodeDate } =
    React.useContext(AdminContext)

  function receiveOrderArray(status) {
    //  check the item in the order array to know if it is accepted or rejected
    if (orders[0]?.transfer_approve || orders[0].transfer_rejected) {
      if (orders[0]?.transfer_approve) {
        return toast.error('This Order has been Accepted')
      } else if (orders[0].transfer_rejected) {
        return toast.error('This Order has been Rejected')
      }
    }
    let ids = []
    orders.forEach((order) => {
      ids.push(order._id)
    })
    console.log(ids, status)
    updateOrderTransferStatusFunction(ids, status)
  }
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

        {transfer === false || !transfer ? (
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
        ) : (
          <div>
            {' '}
            <CDropdown variant="btn-group">
              <CDropdownToggle color="primary">Actions</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => receiveOrderArray('approve')}>Approve</CDropdownItem>
                <CDropdownItem onClick={() => receiveOrderArray('reject')}>Reject</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        )}
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
                      <div>₦{item?.item_amount.toLocaleString()}</div>
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

function OrderGroupCardComponent({ order, transfer }) {
  const { socket } = useContext(SocketContext)

  const { updateOrderGroupTransferStatusFunction, updateOrderGroupStatusFunction } =
    useContext(AdminContext)
  const [showDropDown, setShowDropDown] = useState(false)
  useEffect(() => {
    // console.log('OrderGroupCardComponent', order)
  }, [order])
  // function updateGroupOrderStatusFunction() {}
  function updateOrderTransferGroupStatusFunction(status) {
    if (order?.transfer_approve || order.transfer_rejected) {
      if (order?.transfer_approve) {
        return toast.error('This Order has been Accepted')
      } else if (order.transfer_rejected) {
        return toast.error('This Order has been Rejected')
      }
    }

    socket.emit(
      'admin_orderWithTransferAction',
      {
        group_transfer_id: order._id,
        status,
      },
      (callback) => {
        // console.log('Received data:', { data: callback.data })
        // setOrderList({ loading: false, data: callback.data?.reverse() })
      },
    )

    // updateOrderGroupTransferStatusFunction(order._id, status)
  }
  return (
    <div className="OrderGroupCardComponent">
      <div className="head">
        <div className="d-flex gap-3" onClick={() => setShowDropDown(!showDropDown)}>
          <CAvatar
            size="md"
            // src={item?.user?.user_avatar}
            src="https://via.placeholder.com/600x400?text=Image"
            status={'success'}
            className="d-none d-md-block"
          />
          <div className="user-name">
            {order?.user?.full_name}
            <br />
            {/* <b>Email:</b> {order?.user?.email} || */}
            <b>Contact:</b> {order?.user?.phone_number}
            {/* {order.statues === 'Delivered' || order.statues === 'Completed' ? (
              ''
            ) : (
              <>
                {order?.address?.split(',')[0] &&
                order?.address?.split(',')[1] &&
                order?.address?.split(',')[0] !== '' &&
                order?.address?.split(',')[1] !== '' ? (
                  <GetLocation
                    longitude={order?.address?.split(',')[1]}
                    latitude={order?.address?.split(',')[0]}
                  />
                ) : (
                  <div className="text-center">--</div>
                )}
              </>
            )} */}
            <br />
            <b>Business: </b>
            {order?.business?.business_name}
          </div>
        </div>
        {/* <div className="bg-success p-2 text-white">{order.statues}</div> */}
        {order.statues === 'Delivered' || order.statues === 'Completed' ? (
          moment(order?.createdAt).format('MMM Do YY, h:mm a')
        ) : (
          <CountdownTimer createdAt={order?.createdAt} />
        )}

        {transfer === false || !transfer ? (
          <div className="user-name">
            {' '}
            {order?.address?.split(',')[0] &&
            order?.address?.split(',')[1] &&
            order?.address?.split(',')[0] !== '' &&
            order?.address?.split(',')[1] !== '' ? (
              <LocationDropdown
                location={`https://www.google.com/maps/search/?api=1&query=${
                  order?.address?.split(',')[0]
                },${order?.address?.split(',')[1]}`}
              />
            ) : (
              'Location not valid'
            )}
          </div>
        ) : (
          <div>
            {' '}
            <CDropdown variant="btn-group">
              <CDropdownToggle color="primary">Actions</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => updateOrderTransferGroupStatusFunction('approve')}>
                  Approve
                </CDropdownItem>
                <CDropdownItem onClick={() => updateOrderTransferGroupStatusFunction('reject')}>
                  Reject
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        )}
        {order.discount ? (
          <div className="discount-tag">
            {order.discount.type == 'percent' && <>{order.discount.discount}%</>}
            {order.discount.type == 'rate' && <>₦{order.discount.discount}</>}
          </div>
        ) : (
          ''
        )}
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
        <div className="business-head flex-wrap">
          <div className="d-flex gap-3">
            {/* <div className="user-name"> */}
            <img
              src={
                order?.business?.business_cover_image ||
                'https://via.placeholder.com/600x400?text=Image'
              }
            />
            <div>
              {order?.business?.business_name}
              <br />
              <b>Contact:</b> {order?.business?.business_number}
            </div>
            {/* </div> */}
          </div>

          <div className="user-name">
            {' '}
            {order?.business?.business_location?.lat ||
            order?.business?.business_location?.long ||
            order?.business?.business_location?.lat !== '' ||
            order?.business?.business_location?.long !== '' ? (
              <LocationDropdown
                location={`https://www.google.com/maps/search/?api=1&query=${order?.business?.business_location?.lat},${order?.business?.business_location?.long}`}
              />
            ) : (
              'Location not valid'
            )}
          </div>
        </div>
        <hr />
        <div className="d-flex  justify-content-between flex-wrap">
          <p>
            <b>Ordered: </b>
            {moment(order?.createdAt).format('MMM Do YY, h:mm a')}
          </p>
          {order.statues === 'Delivered' || order.statues === 'Completed' ? (
            order.statues
          ) : (
            <CountdownTimer createdAt={order?.createdAt} />
          )}
        </div>
        <div className="product-body">
          {order?.items.map((item, i) => {
            // totalPrice += item.product.prices
            return (
              <div className="item m-1" key={i}>
                <div className="d-flex align-items-center justify-content-center gap-2 ">
                  <img src={item?.product?.image_url} />
                  {item?.product?.name} x{item?.count}
                </div>
                {item?.product?.prices * item?.count}
              </div>
            )
          })}
          <hr />
          <b>Message:</b>
          {order?.note || 'No message'}
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              {' '}
              <p>
                <b>Service Fee:</b> {order?.service_fee}
              </p>
              <p>
                <b>Delivery Fee:</b> {order?.delivery_fee}
              </p>
            </div>
            <div>
              <p>
                <b>Sub Total Fee: </b> {order?.pay_with_reword_point?.value}
              </p>
              <p>
                <b>Sub Total Fee: </b> {order?.sub_total}
              </p>
              <p>
                <b>Total Fee: </b> {order?.total_amount}
              </p>
            </div>
          </div>

          <div className="d-flex  ">
            <p>
              <b>Status: </b>
              {order?.statues}
            </p>
            {transfer ? (
              <div className="ms-auto">
                {!order.transfer_approve & !order.transfer_rejected ? (
                  'Not Attended to'
                ) : (
                  <>
                    {order.transfer_approve ? 'Approved' : null}
                    {order.transfer_rejected ? 'Rejected' : null}
                  </>
                )}
              </div>
            ) : (
              <CDropdown variant="btn-group" className="ms-auto">
                <CDropdownToggle color="primary">Actions</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    onClick={() => updateOrderGroupStatusFunction(order?._id, 'Pending')}
                  >
                    Pending
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => updateOrderGroupStatusFunction(order?._id, 'Picked up')}
                  >
                    Picked up
                  </CDropdownItem>
                  <CDropdownItem
                    onClick={() => updateOrderGroupStatusFunction(order?._id, 'Delivered')}
                  >
                    Delivered
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            )}
          </div>
        </div>
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
                              <div>₦{item?.item_amount.toLocaleString()}</div>
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
          <CCardHeader>Orders Delivered</CCardHeader>
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
                              <div>₦{item?.item_amount.toLocaleString()}</div>
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
  const [time, setTime] = useState({
    hours: '',
    minutes: '',
    seconds: '',
  })

  useEffect(() => {
    // Given date (replace this with your given date)
    const givenDate = new Date(createdAt)
    const interval = setInterval(() => {
      // Current date
      const currentDate = new Date()

      // Calculate the time difference in milliseconds
      const timeDifference = currentDate - givenDate

      // Calculate the time components
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({
        hours,
        minutes,
        seconds,
      })
      // console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`)
    }, 1000) // Update every 1 second

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval)
  }, [])
  // useEffect(() => {
  //   console.log('remainingTime', remainingTime)
  //   console.log('delayTime', delayTime)
  // }, [remainingTime])

  return (
    <div
      style={
        time.hours > 0
          ? {
              color: 'red',
            }
          : time.minutes >= 30
          ? {
              color: 'red',
            }
          : time.minutes >= 20
          ? {
              color: '#f98200',
            }
          : {
              color: 'green',
            }
      }
    >
      {/* {remainingTime <= 0 ? (
        <div className="text-red" style={{ color: 'red' }}>
          {delayTime} minutes
          <div className="small " style={{ color: 'red' }}>
            Delayed
          </div>
        </div>
      ) : (
        <div>{remainingTime} minutes left</div>
      )} */}
      {time.hours > 0 && `${time.hours} Hours, `}

      {time.minutes > 0 && `${time.minutes} Minutes, `}

      {time.seconds > 0 && `${time.seconds} Seconds`}
      {/* {console.log(Math.floor(moment().diff(createdAt, 'hours')))} */}
      {/* {console.log(moment().now().diff(moment(createdAt), 'seconds'))} */}
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
  transfer: PropTypes.bool,
}
// OrderGroupCardComponent.propTypes = {
//   orders: PropTypes.object,
//   'orders.user': PropTypes.object,
//   transfer: PropTypes.bool,
// }

OrderGroupCardComponent.propTypes = {
  order: PropTypes.shape({
    user: PropTypes.shape({
      full_name: PropTypes.string,
      email: PropTypes.string,
      phone_number: PropTypes.number,
      // ... other user properties
    }),
    discount: PropTypes.shape({
      type: PropTypes.string,
      discount: PropTypes.number,
      // Add more nested properties if necessary
    }),
    business: PropTypes.shape({
      business_cover_image: PropTypes.string,
      business_name: PropTypes.string,
      business_number: PropTypes.number,
      business_location: PropTypes.object,
      // ... other business properties
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        // Define the structure of each item in the 'items' array
        // For example:
        id: PropTypes.string,
        name: PropTypes.string,
        count: PropTypes.number,
        // ... other properties of an item
      }),
    ),
    note: PropTypes.string,
    address: PropTypes.string,
    sub_total: PropTypes.number,
    total_amount: PropTypes.number,
    service_fee: PropTypes.number,
    delivery_fee: PropTypes.number,
    createdAt: PropTypes.string,
    _id: PropTypes.string,
    statues: PropTypes.string,
    transfer_approve: PropTypes.bool,
    transfer_rejected: PropTypes.bool,
    // ... other order properties
  }).isRequired,
  transfer: PropTypes.bool,
}

Orders.propTypes = {
  orderGroupList: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,

        description: PropTypes.string.isRequired,
      }),
    ),
  }),
}

OrderTabComponent.propTypes = {
  orderGroupList: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        // Define the properties of each order object
        status: PropTypes.string.isRequired,
        // ... other properties
      }),
    ),
    // ... other properties of orderGroupList
  }),
}

// ... (export statement if applicable)
