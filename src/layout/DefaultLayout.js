import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AdminContext } from 'src/context/adminContext'

const DefaultLayout = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const {
    token,
    setToken,
    getBusinessRecordsFunction,
    getUserRecordsFunction,
    getOrderRecordsFunction,
    getAdminRecordsFunction,
    getCartRecordsFunction,
    getAmbassadorRecordsFunction,
    getRewordsFunction,
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
  }, [token])

  React.useEffect(() => {
    if (!token) return
    getCartRecordsFunction()
    getAmbassadorRecordsFunction()
    getRewordsFunction()
  }, [token])
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
