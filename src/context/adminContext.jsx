import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'
import moment from 'moment'

export const AdminContext = createContext()

function AdminProvider({ children }) {
  const [cookies, removeCookie] = useCookies()
  // const navigate = useNavigate()
  let apiUrl = 'http://localhost:5000/api'
  // let apiUrl = 'https://binnox.herokuapp.com/api'
  // let apiUrl = 'https://binnox-backend.vercel.app/api'
  const [modalComponentVisible, setModalComponentVisible] = React.useState(false)
  const [refreshLoading, setRefreshLoading] = React.useState(false)
  const [token, setToken] = React.useState(null)
  const [userList, setUserList] = React.useState({
    loading: true,
    data: [],
  })
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
    if (orderList.loading) return
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

    orderList.data.forEach((order) => {
      // get totalTransactions from summing up transactions fees
      totalTransactions += order.item_amount

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

    // 5% of transaction
    transactions5percent = calculatePercentage(totalTransactions, 5)
    // remove 5% from totalTransactions
    calculatedTransactions = totalTransactions - transactions5percent

    //
    // calculatedProfit is service fee (5% from user) +  transaction fee (5% from business) + delivery fee (10% from delivery)
    calculatedProfit = transactions5percent + delivery10Percent + totalServiceFee

    // groundTotal = totalTransactions + totalDeliveryFee + totalServiceFee
    console.log({
      totalTransactions,
      transactions5percent,
      calculatedTransactions,
      totalDeliveryFee,
      totalServiceFee,
      groundTotal,
      calculatedDeliveryFee,
      delivery10Percent,
      calculatedProfit,
    })
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
  }, [orderList])

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
    setCartList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/cart/admin`, {
        headers: {
          Authorization: cookies.BinnoxAdmin.token,
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
      .then((res) => {
        // console.log('orders', res.data)
        setOrderList({ loading: false, data: res.data.orders.reverse() })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getOrderGroupRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setOrderGroupList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/admin/orders/group?max_data_return=100`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log('getOrderGroupRecordsFunction', res.data)
        setOrderGroupList({ loading: false, data: res.data.orders.reverse() })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getOrderTransferRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setOrderTransferList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/admin/orders/transfer?max_data_return=100`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log('orders Request', res.data.orders)
        setOrderTransferList({
          loading: false,
          data: res.data.orders.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getOrderGroupTransferRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setOrderGroupTransferList({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/admin/orders/transfer/group?max_data_return=100`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        // console.log('orders Request', res.data.orders)

        let newOrdersList = []
        let acceptedOrdersList = []
        res?.data?.orders?.reverse()?.forEach((item) => {
          if (!item?.transfer_approve && !item.transfer_rejected) {
            // console.log(item)
            newOrdersList.push(item)
          } else {
            acceptedOrdersList.push(item)
          }
        })
        // console.log('orderTransferList', orderTransferList)
        // setOrderGroupTransferList({
        //   loading: false,
        //   data: {
        //     new: newOrdersList,
        //     accepted: acceptedOrdersList,
        //   },
        // })
        setOrderGroupTransferList({
          loading: false,
          data: res.data.orders.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function getPaymentRequestFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    setPaymentRequest({
      loading: true,
      data: [],
    })
    axios
      .get(`${apiUrl}/admin/payment-request`, {
        headers: {
          Authorization: token,
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
    axios
      .put(
        `${apiUrl}/admin/status/transfer/group`,
        {
          group_transfer_id: id,
          status,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        toast.success('Successfully')
        // getOrderRecordsFunction()
        setOrderGroupTransferList({
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
  return (
    <AdminContext.Provider
      value={{
        apiUrl,
        token,
        setToken,
        getUserRecordsFunction,
        getBusinessRecordsFunction,
        getOrderRecordsFunction,
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
        adminRecords,
        setAdminRecords,
        orderGroupTransferList,
        setOrderGroupTransferList,
        updateOrderGroupTransferStatusFunction,
        updateOrderGroupStatusFunction,
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
