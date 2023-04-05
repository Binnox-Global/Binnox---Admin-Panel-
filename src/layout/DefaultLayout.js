import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DefaultLayout = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const navigate = useNavigate()
  useEffect(() => {
    if (!cookies.BinnoxAdmin || !cookies.BinnoxAdmin.profile || !cookies.BinnoxAdmin.token) {
      toast.info('Login expired')
      navigate('/login')
    }
  }, [])
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
