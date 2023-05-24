import axios from 'axios'
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'
import moment from 'moment'

export const AdminContext = createContext()

function AdminProvider({ children }) {
  const [cookies, removeCookie] = useCookies()
  // const navigate = useNavigate()
  // let apiUrl = 'http://localhost:5000/api'
  let apiUrl = 'https://binnox.herokuapp.com/api'

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
    data: [],
  })
  const [orderList, setOrderList] = React.useState({
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
        setBusinessList({
          loading: false,
          data: res.data.business.reverse(),
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getOrderRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
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
  async function getPaymentRequestFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    axios
      .get(`${apiUrl}/admin/payment-request`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('payment-request', res.data)
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
  return (
    <AdminContext.Provider
      value={{
        apiUrl,
        token,
        setToken,
        getUserRecordsFunction,
        getBusinessRecordsFunction,
        getOrderRecordsFunction,
        getAdminRecordsFunction,
        activeAccountFunction,
        updateOrderStatusFunction,
        userList,
        businessList,
        orderList,
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
