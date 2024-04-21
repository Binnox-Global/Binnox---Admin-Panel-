import axios from 'axios'
import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'
import moment from 'moment'

export const AdminContext = createContext()

function AdminProvider({ children }) {
  // const { socket } = useContext(SocketContext)

  const [cookies, removeCookie] = useCookies()
  // const navigate = useNavigate()
  // let apiUrl = 'http://localhost:5000/api'
  // let apiUrl = 'https://binnox.herokuapp.com/api'
  let apiUrl = 'https://binnox-backend.vercel.app/api'
  const [modalComponentVisible, setModalComponentVisible] = React.useState(false)
  const [refreshLoading, setRefreshLoading] = React.useState(false)
  const [token, setToken] = React.useState(null)
  const [userList, setUserList] = React.useState({
    loading: true,
    data: [],
  })
  const [notificationToast, setNotificationToast] = React.useState([])
  const [adminList, setAdminList] = React.useState({
    loading: true,
    data: [],
  })
  const [businessList, setBusinessList] = React.useState({
    loading: true,
    active: [],
    others: [],
  })
  const [orderList, setOrderList] = React.useState({
    loading: true,
    data: [],
  })
  const [generalOrder, setGeneralOrder] = React.useState({ loading: true, data: [] })
  const [orderGroupList, setOrderGroupList] = React.useState({
    loading: true,
    data: [],
  })
  const [orderTransferList, setOrderTransferList] = React.useState({
    loading: true,
    data: [],
  })
  const [orderGroupTransferList, setOrderGroupTransferList] = React.useState({
    loading: true,
    data: {
      new: [],
      accepted: [],
      rejected: [],
    },
  })
  const [adminRecords, setAdminRecords] = React.useState({
    loading: true,
    totalTransactions: 0,
    transactions5percent: 0,
    totalDeliveryFee: 0,
    totalServiceFee: 0,
    groundTotal: 0,
    calculatedTransactions: 0,
    delivery10Percent: 0,
    calculatedDeliveryFee: 0,
    calculatedProfit: 0,
  })
  const [cartList, setCartList] = React.useState({
    loading: true,
    data: [],
  })

  const [paymentRequest, setPaymentRequest] = React.useState({
    loading: true,
    data: [],
    history: [],
  })

  const [instantPayment, setInstantPayment] = React.useState({
    loading: true,
    data: [],
  })
  const [discountList, setDisCountList] = React.useState({
    loading: true,
    data: {},
  })
  const [ambassadorList, setAmbassadorList] = React.useState({
    loading: true,
    data: [],
  })
  const [rewords, setRewords] = React.useState({
    loading: true,
    data: {},
  })

  function getDiscountCodeFunction() {
    // axios Get request
    const options = {
      url: `${apiUrl}/admin/discount`,
      method: 'GET',
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
        // console.log(response.data)
        setDisCountList({ loading: false, data: response.data })
        // setLoading(false)
      })
      .catch((error) => {
        // setLoading(false)
        // console.log(error)
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        toast.error(error.message)
      })
  }

  function calculatePercentage(number, percent) {
    if (typeof number !== 'number' || typeof percent !== 'number') {
      throw new Error('Both arguments must be numbers')
    }

    const calculatedValue = (number * percent) / 100
    return calculatedValue
  }

  useEffect(() => {
    setAdminRecords({
      loading: true,
      totalTransactions: 0,
      transactions5percent: 0,
      totalDeliveryFee: 0,
      totalServiceFee: 0,
      groundTotal: 0,
      calculatedTransactions: 0,
      delivery10Percent: 0,
      calculatedDeliveryFee: 0,
      calculatedProfit: 0,
    })
    if (generalOrder.loading) return
    // console.log('orderList', orderList.data)

    let totalTransactions = 0
    let transactions5percent = 0
    let calculatedTransactions = 0
    let totalDeliveryFee = 0
    let delivery10Percent = 0
    let calculatedDeliveryFee = 0
    let totalServiceFee = 0
    let groundTotal = 0
    let calculatedProfit = 0

    // console.log('orderGroupList', orderGroupList)
    generalOrder.data.forEach((order) => {
      // get totalTransactions from summing up transactions fees
      // console.log(order)
      if (!isNaN(order?.sub_total)) {
        totalTransactions += order?.sub_total
      }

      if (order.delivery_fee) {
        // get totalDeliveryFee from summing up delivery fees
        totalDeliveryFee += order.delivery_fee
      } else {
        totalDeliveryFee += 600
      }

      if (order.service_fee) {
        // get totalServiceFee from summing up service fees
        totalServiceFee += order.service_fee
      } else {
        totalServiceFee += 200
      }
    })

    // 10% of delivery
    delivery10Percent = calculatePercentage(totalDeliveryFee, 10)
    // remove 10% from totalDeliveryFee
    calculatedDeliveryFee = totalDeliveryFee - delivery10Percent
    // console.log('delivery10Percent', delivery10Percent)
    // console.log('calculatedDeliveryFee', calculatedDeliveryFee)
    // console.log('totalDeliveryFee', totalDeliveryFee)

    // 5% of transaction
    transactions5percent = calculatePercentage(totalTransactions, 5)
    // remove 5% from totalTransactions
    calculatedTransactions = totalTransactions - transactions5percent

    //
    // calculatedProfit is service fee (5% from user) +  transaction fee (5% from business) + delivery fee (10% from delivery)
    calculatedProfit = transactions5percent + delivery10Percent + totalServiceFee

    groundTotal = totalTransactions + totalDeliveryFee + totalServiceFee
    // console.log({
    //   totalTransactions,
    //   transactions5percent,
    //   calculatedTransactions,
    //   totalDeliveryFee,
    //   totalServiceFee,
    //   groundTotal,
    //   calculatedDeliveryFee,
    //   delivery10Percent,
    //   calculatedProfit,
    // })
    setAdminRecords({
      loading: false,
      totalTransactions,
      transactions5percent,
      totalDeliveryFee,
      totalServiceFee,
      groundTotal,
      calculatedTransactions,
      delivery10Percent,
      calculatedDeliveryFee,
      calculatedProfit,
    })
  }, [generalOrder])

  async function getAmbassadorRecordsFunction() {
    axios
      .get(`${apiUrl}/admin/ambassador`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setAmbassadorList({
          loading: false,
          data: res.data.ambassadors.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getRewordsFunction() {
    axios
      .get(`${apiUrl}/user/rewords`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data.reword)
        setRewords({
          loading: false,
          data: res.data.reword,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getAdminRecordsFunction() {
    axios
      .get(`${apiUrl}/admin/admin`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setAdminList({
          loading: false,
          data: res.data.admins.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getUserRecordsFunction() {
    // url: `${apiUrl}/auth/admin/login`,
    // axios POST request

    // console.log(cookies.BinnoxAdmin.token)
    axios
      .get(`${apiUrl}/admin/customer?max_data_return=100`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUserList({
          loading: false,
          data: res.data.users.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getBusinessRecordsFunction() {
    axios
      .get(`${apiUrl}/admin/business`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        // filter the business results

        let active = []
        let others = []
        res.data.business.reverse().forEach((business) => {
          if (business?.business_active && business.business_verified && business.business_online) {
            active.push(business)
          } else {
            others.push(business)
          }
        })

        setBusinessList({
          loading: false,
          active,
          others,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getCartRecordsFunction() {
    if (!cookies.BinnoxAdmin.token) return
    setCartList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/cart/admin`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log('Carts', res.data.carts.reverse())

        setCartList({ loading: false, data: res.data.carts.reverse() })
        // setCartList({ loading: false, data: res.data.carts })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getOrderRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setOrderList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/admin/orders?max_data_return=100`, {
        headers: {
          Authorization: token,
        },
      })
      .then(async (res) => {
        // console.log('orders', res.data.orders.reverse())

        // convertOldOrderToNewOderFunction(res.data.orders.reverse())

        setOrderList({ loading: false, data: res.data.orders.reverse() })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    populateGeneralOrder()
  }, [orderList, orderGroupList])
  useEffect(() => {
    groupFunctionTestFunction(generalOrder.data)
  }, [generalOrder])

  async function populateGeneralOrder() {
    if (orderList.loading === false && orderGroupList.loading === false) {
      let oldOrderMadeNew = await convertOldOrderToNewOderFunction(orderList.data)
      // console.log('oldOrderMadeNew', oldOrderMadeNew.length)
      setGeneralOrder({
        loading: false,
        data: [...orderGroupList.data, ...oldOrderMadeNew],
      })
    }
  }

  async function convertOldOrderToNewOderFunction(oldOrderArray) {
    let oldOrderArrayOfArray = await groupOrderWithUserAndTime(oldOrderArray)
    // console.log('oldOrderArray', oldOrderArray)
    let newGroupOrderStructure = []
    oldOrderArrayOfArray.forEach(async (orderArray) => {
      let singleOrder = structureOldOrderLikeNewOrder(orderArray)
      newGroupOrderStructure.push(singleOrder)
      // console.log('singleOrder', singleOrder)
      // console.log();
    })
    // console.log('newGroupOrderStructure', newGroupOrderStructure)
    return newGroupOrderStructure
  }

  async function groupOrderWithUserAndTime(ordersArray) {
    // Create an array to store grouped orders
    const groupedOrders = []

    // Iterate through the items
    ordersArray.forEach((item) => {
      const { user, createdAt } = item
      // console.log(item)
      const orderTime = moment(createdAt)

      // Check if there is a group with the same user ID and order time
      const existingGroup = groupedOrders.find((group) =>
        group.some(
          (groupedItem) =>
            groupedItem.user._id === user._id &&
            moment(groupedItem.createdAt).isSame(orderTime, 'second'),
        ),
      )

      if (existingGroup) {
        // Add the item to the existing group
        existingGroup.push(item)
      } else {
        // Create a new group for the item
        groupedOrders.push([item])
      }
    })

    // console.log(groupedOrders)
    return groupedOrders
  }

  function structureOldOrderLikeNewOrder(orderArray) {
    let itemsArray = []
    let calculatedSubTotal = 0
    orderArray.forEach((order) => {
      if (order.product?.available_count === undefined) return
      calculatedSubTotal += order?.item_amount
      // console.log('order?.item_amount', order?.product?.available_count)
      itemsArray.push({
        count: order.item_count,
        product: {
          available_count: order.product?.available_count,
          image_url: order.product.image_url,
          name: order.product.name,
          prices: order.item_amount,
          sold_count: order.product.sold_count,
          _id: order.product._id,
        },
        _id: order.product._id,
      })
    })

    // let {} firstOrder
    let {
      business,
      delivered,
      delivery_fee,
      delivery_rate,
      discount,
      receipt,
      received,
      address,
      service_fee,
      statues,
      updatedAt,
      createdAt,
      _id,
      user,
    } = orderArray[0]

    let calculatedTotal = calculatedSubTotal + service_fee || 200 + delivery_fee || 600

    let newOrderStructure = {
      address,
      business,
      createdAt,
      delivered,
      delivery_fee,
      delivery_rate,
      discount,
      items: itemsArray,
      receipt,
      received,
      service_fee,
      statues,
      sub_total: calculatedSubTotal,
      total_amount: calculatedTotal,
      updatedAt,
      user,
      _id,
    }
    return newOrderStructure
  }

  async function getOrderGroupRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    // setOrderGroupList({
    //   loading: true,
    //   data: [],
    // })
    // axios
    //   .get(`${apiUrl}/admin/orders/group?max_data_return=100`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log('getOrderGroupRecordsFunction', res.data)
    //     let orders = res.data.orders.reverse()
    //     setOrderGroupList({ loading: false, data: orders })
    //     let groupOrderByDate = groupOrderByDateFunction(orders)
    //     // let groupFunctionTest = groupFunctionTestFunction(orders)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }
  async function getOrderTransferRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    // setOrderTransferList({
    //   loading: true,
    //   data: [],
    // })
    // axios
    //   .get(`${apiUrl}/admin/orders/transfer?max_data_return=100`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log('orders Request', res.data.orders)
    //     setOrderTransferList({
    //       loading: false,
    //       data: res.data.orders.reverse(),
    //     })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  async function getOrderGroupTransferRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    // setOrderGroupTransferList({
    //   loading: true,
    //   data: {
    //     new: [],
    //     accepted: [],
    //     rejected: [],
    //   },
    // })
    // axios
    //   .get(`${apiUrl}/admin/orders/transfer/group?max_data_return=100`, {
    //     headers: {
    //       Authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log('orders Request', res.data.orders)
    //     let newOrdersList = []
    //     let acceptedOrdersList = []
    //     let rejectedOrdersList = []
    //     res?.data?.orders?.reverse()?.forEach((item) => {
    //       if (!item?.transfer_approve && !item.transfer_rejected) {
    //         // console.log(item)
    //         newOrdersList.push(item)
    //       } else {
    //         if (item?.transfer_approve && !item.transfer_rejected) {
    //           // console.log('AA', item)
    //           acceptedOrdersList.push(item)
    //         } else {
    //           // console.log('BB', item)
    //           rejectedOrdersList.push(item)
    //         }
    //       }
    //     })
    //     // console.log('orderTransferList', orderTransferList)
    //     // setOrderGroupTransferList({
    //     //   loading: false,
    //     //   data: res.data.orders.reverse(),
    //     // })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }
  async function getPaymentRequestFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setPaymentRequest({
      loading: true,
      data: [],
    })

    if (!cookies?.BinnoxAdmin?.token) return
    axios
      .get(`${apiUrl}/admin/payment-request`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log('payment-request', res.data)
        setPaymentRequest({
          loading: false,
          data: res.data.requests.reverse(),
          history: res.data.history.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getInstantPaymentRecordFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setPaymentRequest({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/payout`, {
        headers: {
          Authorization: cookies.BinnoxAdmin.token,
        },
      })
      .then((res) => {
        // console.log('Instant Payout', res.data)
        setInstantPayment({
          loading: false,
          data: res.data.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function activeAccountFunction(account_type, account_id) {
    // return
    // console.log(token)
    axios
      .put(
        `${apiUrl}/admin/activate?account_id=${account_id}&
account_type=${account_type}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        toast.success('Successfully')
        if (account_type === 'admin') {
          return setAdminList({
            loading: false,
            data: res.data.update.reverse(),
          })
        }
        if (account_type === 'business') {
          return setBusinessList({
            loading: false,
            data: res.data.update.reverse(),
          })
        }

        setUserList({
          loading: false,
          data: res.data.update.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }

  async function verifyAccountFunction(account_type, account_id) {
    axios
      .put(
        `${apiUrl}/admin/verify?account_id=${account_id}&
account_type=${account_type}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        toast.success('Successfully')
        if (account_type === 'admin') {
          return setAdminList({
            loading: false,
            data: res.data.update.reverse(),
          })
        }
        if (account_type === 'business') {
          return setBusinessList({
            loading: false,
            data: res.data.update.reverse(),
          })
        }

        setUserList({
          loading: false,
          data: res.data.update.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }
  async function updateOrderStatusFunction(_id, status) {
    // return
    // console.log(token)
    axios
      .put(
        `${apiUrl}/admin/status?order_id=${_id}&
status=${status}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        toast.success('Successfully')

        setOrderList({
          loading: false,
          data: res.data.update.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }

  async function updateOrderGroupStatusFunction(_id, status) {
    // return
    // console.log(token)
    axios
      .put(
        `${apiUrl}/admin/status/group?order_id=${_id}&
status=${status}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        toast.success('Successfully')

        setOrderGroupList({
          loading: false,
          data: res.data.update.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }

  async function updateOrderTransferStatusFunction(ids, status) {
    // return
    // console.log(token)
    axios
      .put(
        `${apiUrl}/admin/status/transfer`,
        {
          transfer_id_array: ids,
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        // console.log('omoooooooooo', res.data)
        toast.success('Successfully')
        getOrderRecordsFunction()
        setOrderTransferList({
          loading: false,
          data: res.data.update.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }
  async function updateOrderGroupTransferStatusFunction(id, status) {
    // return
    // console.log(token)
    // axios
    //   .put(
    //     `${apiUrl}/admin/status/transfer/group`,
    //     {
    //       group_transfer_id: id,
    //       status,
    //     },
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     toast.success('Successfully')
    //     // getOrderRecordsFunction()
    //     setOrderGroupTransferList({
    //       loading: false,
    //       data: res.data.update.reverse(),
    //     })
    //   })
    //   .catch((error) => {
    //     if (error.response.status || error.response.status === 400) {
    //       return toast.error(error.response.data.message)
    //     }
    //     if (error.response.status || error.response.status === 401) {
    //       return toast.error(error.response.data.message)
    //     }
    //     if (error.response.status || error.response.status === 404) {
    //       return toast.error(error.response.data.message)
    //     }
    //     // toast.success('Successfully')
    //     console.error(error)
    //   })
    // socket.emit(
    //   'admin_orderWithTransferAction',
    //   {
    //     group_transfer_id: id,
    //     status,
    //   },
    //   (callback) => {
    //     // console.log('Received data:', { data: callback.data })
    //     // setOrderList({ loading: false, data: callback.data?.reverse() })
    //   },
    // )
  }

  async function updatePaymentRequestStatusFunction(_id, status) {
    // return
    // console.log(token)
    axios
      .put(
        `${apiUrl}/admin/payment-request?request_id=${_id}`,
        { ...status },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        toast.success('Successfully')

        setPaymentRequest({
          loading: false,
          data: res.data.requests.reverse(),
          history: res.data.history.reverse(),
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }
  function updateDiscountStateFunction(id, active) {
    // axios PUT request
    // return console.log(id, active)
    const options = {
      url: `${apiUrl}/admin/discount?discount_id=${id}&active=${active}`,
      method: 'PUT',
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
        setDisCountList({ loading: false, data: response.data.discounts })
        // setLoading(false)

        // toast.success('Code Created Successfully')
      })
      .catch((error) => {
        // setLoading(false)
        // console.log(error)
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        toast.error(error.message)
      })
  }

  function deleteDiscountCodeFunction(discount) {
    // let enteredCode = window.prompt('Enter discount code')
    // console.log(discount)
    if (window.confirm(`Are you sure you wan to delete ${discount.code}`)) {
      // axios DELETE request
      const options = {
        url: `${apiUrl}/admin/discount?discount_id=${discount._id}`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      }

      axios(options)
        .then((response) => {
          console.log(response.data)
          setDisCountList({ loading: false, data: response.data.discounts })

          toast.success('Code Deleted Successfully')
        })
        .catch((error) => {
          if (error.response.status || error.response.status === 400) {
            return toast.error(error.response.data.message)
          }
          if (error.response.status || error.response.status === 404) {
            return toast.error(error.response.data.message)
          }
          toast.error(error.message)
        })
    }
  }
  function logoutFunction() {
    if (window.confirm('You will be logged out of your account !!!')) {
      // localStorage.removeItem("telecomMerchant");

      // setUserAccountInformation([]);
      // setUserProfile([]);
      // setLoggedIn(false);
      removeCookie('BinnoxAdmin', { path: '/' })
      // navigate('./')
      // window.location('/')
      window.location.href = '/'
    }
  }

  function decodeDate(date) {
    // moment()
    const dateArray = moment(date).format('ddd, MMM Do YYYY T h:mm:ss a').split('T')
    // console.log(dateArray);
    const timeOnly = dateArray[1].split('+')
    // console.log(dateArray);
    return [dateArray[0], timeOnly[0]]
  }

  async function refreshDashboardFunction() {
    setRefreshLoading(true)

    const promises = []

    // Assuming these are your async functions
    // promises.push(asyncFunction1());
    // promises.push(asyncFunction2());
    // promises.push(asyncFunction3());
    promises.push(await getOrderGroupRecordsFunction())
    promises.push(await getUserRecordsFunction())
    promises.push(await getBusinessRecordsFunction())
    promises.push(await getOrderRecordsFunction())
    promises.push(await getOrderTransferRecordsFunction())
    promises.push(await getAdminRecordsFunction())
    promises.push(await getPaymentRequestFunction())
    promises.push(await getCartRecordsFunction())
    promises.push(await getAmbassadorRecordsFunction())
    promises.push(await getRewordsFunction())
    promises.push(await getOrderGroupTransferRecordsFunction())

    // Wait for all promises to resolve
    const results = await Promise.all(promises)

    // console.log('results', results)

    // Update state after all promises have resolved
    // setState(/* updated state */);
  }

  function groupOrderByDateFunction(orderArray) {
    // const moment = require("moment");

    // // Assuming the orders array is named "orders"
    // const orders = [
    //   // Your array of orders goes here...
    // ];

    // Get the current date in the desired format (e.g., "YYYY-MM-DD")
    const currentDate = moment().format('YYYY-MM-DD')

    // Filter the orders made today using the "createdAt" field
    const ordersMadeToday = orderArray?.filter((order) =>
      moment(order.createdAt).isSame(currentDate, 'day'),
    )

    // Group the orders by date (if needed)
    const ordersGroupedByDate = orderArray?.reduce((groupedOrders, order) => {
      const orderDate = moment(order.createdAt).format('YYYY-MM-DD')
      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = []
      }
      groupedOrders[orderDate].push(order)
      return groupedOrders
    }, {})

    //  setReferralOrderGrouping({ ordersGroupedByDate, ordersMadeToday })
    // console.log('Orders:', orderArray)
    // console.log('Orders made today:', ordersMadeToday)
    // console.log('Orders grouped by date:', ordersGroupedByDate)
    return { ordersMadeToday, ordersGroupedByDate }
  }

  const [groupedOrderData, setGroupedOrderData] = React.useState({
    loading: true,
    data: [],
  })

  function groupFunctionTestFunction(orderArray) {
    // Group orders by day
    // console.log('orderArray', orderArray)
    const groupedOrders = orderArray.reduce((result, order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString() // Group by date

      if (!result[orderDate]) {
        result[orderDate] = {
          date: orderDate,
          totalAmount: 0,
          orderCount: 0,
        }
      }

      result[orderDate].totalAmount += order.total_amount
      result[orderDate].orderCount++

      return result
    }, {})

    const groupedOrderData = Object.values(groupedOrders)

    setGroupedOrderData({ data: groupedOrderData })
    // console.log('groupedOrderData', groupedOrderData)
    return groupedOrderData
  }
  const [referralOrderGrouping, setReferralOrderGrouping] = React.useState({
    ordersGroupedByDate: {},
    ordersMadeToday: [],
  })

  useEffect(() => {
    groupOrderFunction()
  }, [generalOrder])

  function groupOrderFunction() {
    // Get the current date in the desired format (e.g., "YYYY-MM-DD")
    const currentDate = moment().format('YYYY-MM-DD')

    // Filter the orders made today using the "createdAt" field
    const ordersMadeToday = generalOrder.data?.filter((order) =>
      moment(order.createdAt).isSame(currentDate, 'day'),
    )

    // Group the orders by date (if needed)
    const ordersGroupedByDate = generalOrder.data?.reduce((groupedOrders, order) => {
      const orderDate = moment(order.createdAt).format('YYYY-MM-DD')
      if (!groupedOrders[orderDate]) {
        groupedOrders[orderDate] = []
      }
      groupedOrders[orderDate].push(order)
      return groupedOrders
    }, {})

    setReferralOrderGrouping({ ordersGroupedByDate, ordersMadeToday })
    // console.log('Orders:', generalOrder.data)
    // console.log('Orders made today:', ordersMadeToday)
    // console.log('Orders grouped by date:', ordersGroupedByDate)
    // return { ordersMadeToday, ordersGroupedByDate };
  }
  const [adminDailyRecords, setAdminDailyRecords] = React.useState({
    loading: true,
    data: [],
  })
  useEffect(() => {
    if (!token) return
    getAdminDailyRecordsFunction()
  }, [token])
  function getAdminDailyRecordsFunction() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${apiUrl}/admin/admin_records`,
      headers: {
        Authorization: token,
      },
    }

    axios
      .request(config)
      .then((response) => {
        setAdminDailyRecords({
          loading: false,
          data: response.data.records.reverse(),
        })
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AdminContext.Provider
      value={{
        apiUrl,
        token,
        setToken,
        getUserRecordsFunction,
        getBusinessRecordsFunction,
        getOrderRecordsFunction,
        setOrderList,
        getOrderTransferRecordsFunction,
        getOrderGroupTransferRecordsFunction,
        getAdminRecordsFunction,
        activeAccountFunction,
        updateOrderStatusFunction,
        updateOrderTransferStatusFunction,
        userList,
        businessList,
        orderList,
        orderTransferList,
        adminList,
        verifyAccountFunction,
        logoutFunction,
        getPaymentRequestFunction,
        paymentRequest,
        updatePaymentRequestStatusFunction,
        decodeDate,
        getDiscountCodeFunction,
        discountList,
        updateDiscountStateFunction,
        deleteDiscountCodeFunction,
        getCartRecordsFunction,
        cartList,
        modalComponentVisible,
        setModalComponentVisible,
        ambassadorList,
        setAmbassadorList,
        getAmbassadorRecordsFunction,
        getRewordsFunction,
        rewords,
        setRewords,
        refreshDashboardFunction,
        getOrderGroupRecordsFunction,
        orderGroupList,
        setOrderGroupList,
        adminRecords,
        setAdminRecords,
        orderGroupTransferList,
        setOrderGroupTransferList,
        updateOrderGroupTransferStatusFunction,
        updateOrderGroupStatusFunction,
        notificationToast,
        setNotificationToast,
        groupedOrderData,
        setGroupedOrderData,
        generalOrder,
        instantPayment,
        getInstantPaymentRecordFunction,
        referralOrderGrouping,
        adminDailyRecords,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

AdminProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AdminProvider
