import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AdminContext } from 'src/context/adminContext'
import moment from 'moment'

const DefaultLayout = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const {
    token,
    setToken,
    getBusinessRecordsFunction,
    getUserRecordsFunction,
    getOrderGroupRecordsFunction,
    getOrderRecordsFunction,
    getOrderGroupTransferRecordsFunction,
    getOrderTransferRecordsFunction,
    getAdminRecordsFunction,
    getCartRecordsFunction,
    getAmbassadorRecordsFunction,
    getRewordsFunction,
    getPaymentRequestFunction,
    setNotificationToast,
    paymentRequest,
  } = React.useContext(AdminContext)
  useEffect(() => {
    if (!cookies.BinnoxAdmin || !cookies.BinnoxAdmin.profile || !cookies.BinnoxAdmin.token) {
      toast.info('Login expired')
      navigate('/login')
    } else {
      setToken(cookies.BinnoxAdmin.token)
    }
  }, [])
  React.useEffect(() => {
    getPaymentRequestFunction()
  }, [])
  React.useEffect(() => {
    if (!token) return
    getBusinessRecordsFunction()
    getAdminRecordsFunction()
  }, [token])
  React.useEffect(() => {
    if (!token) return
    getUserRecordsFunction()
  }, [token])
  React.useEffect(() => {
    if (!token) return
    getOrderRecordsFunction()
    getOrderTransferRecordsFunction()
    getOrderGroupTransferRecordsFunction()
  }, [token])

  React.useEffect(() => {
    if (!token) return
    getCartRecordsFunction()
    getAmbassadorRecordsFunction()
    getRewordsFunction()
    getOrderGroupRecordsFunction()
  }, [token])
  React.useEffect(() => {
    let notificationArray = []
    if (paymentRequest.data.length > 0) {
      // console.log('paymentRequest', paymentRequest.data)
      paymentRequest.data.forEach((item) => {
        notificationArray.push({
          header: 'Request Withdrawal',
          message: `${item?.business?.business_name} Request for ₦${item?.amount}`,
          time: moment(item?.createdAt, 'YYYYMMDD').fromNow(),
        })
      })
    }
    setNotificationToast(notificationArray)
  }, [paymentRequest])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
