import axios from 'axios'
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'

export const AdminContext = createContext()

function AdminProvider({ children }) {
  const [cookies] = useCookies()
  let apiUrl = 'http://localhost:5000/api'
  // let apiUrl = 'https://binnox.herokuapp.com/api'
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

  async function getAdminRecordsFunction() {
    axios
      .get(`${apiUrl}/admin/admin`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setAdminList({
          loading: false,
          data: res.data.admins,
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
      .get(`${apiUrl}/admin/customer`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setUserList({
          loading: false,
          data: res.data.users,
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
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setBusinessList({
          loading: false,
          data: res.data.business,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function getOrderRecordsFunction() {
    //  console.log(cookies.BinnoxAdmin.token)
    axios
      .get(`${apiUrl}/admin/orders`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        // console.log('orders', res.data)
        setOrderList({ loading: false, data: res.data.orders })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async function activeAccountFunction(account_type, account_id) {
    // return
    // console.log(cookies?.BinnoxAdmin?.token)
    axios
      .put(
        `${apiUrl}/admin/activate?account_id=${account_id}&
account_type=${account_type}`,
        {},
        {
          headers: {
            Authorization: cookies?.BinnoxAdmin?.token,
          },
        },
      )
      .then((res) => {
        // console.log(res.data)
        toast.success('Successfully')
        if (account_type === 'admin') {
          return setAdminList({
            loading: false,
            data: res.data.update,
          })
        }
        if (account_type === 'business') {
          return setBusinessList({
            loading: false,
            data: res.data.update,
          })
        }

        setUserList({
          loading: false,
          data: res.data.update,
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
    // console.log(cookies?.BinnoxAdmin?.token)
    axios
      .put(
        `${apiUrl}/admin/status?order_id=${_id}&
status=${status}`,
        {},
        {
          headers: {
            Authorization: cookies?.BinnoxAdmin?.token,
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        toast.success('Successfully')

        setOrderList({
          loading: false,
          data: res.data.update,
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

  return (
    <AdminContext.Provider
      value={{
        apiUrl,
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
