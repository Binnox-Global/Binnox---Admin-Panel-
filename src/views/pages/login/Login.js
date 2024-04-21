import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import logoSm from '../../../assets/brand/binnox_logo_small.png'
import { AdminContext } from 'src/context/adminContext'

const Login = () => {
  const [cookies, setCookie] = useCookies()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const { apiUrl, setToken } = React.useContext(AdminContext)
  async function loginUserFunction(e) {
    e.preventDefault()
    // return console.dir(e.target)

    const formElement = e.target

    if (formElement[0].value === '') {
      toast.info('Email is Required')
    }
    if (formElement[1].value === '') {
      toast.info('Password is Required')
    }
    if (formElement[1].value === '' || formElement[0] === '') {
      return
    }
    setLoading(true)
    // setLoading(true)
    const data = {
      email: formElement[0].value,
      password: formElement[1].value,
    }
    // axios POST request
    const options = {
      // url: `http://localhost:5000/api/auth/admin/login`,
      url: `${apiUrl}/auth/admin/login`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: data,
    }

    axios(options)
      .then((response) => {
        // console.log(response.data)
        setLoading(false)
        // setLoggedIn(true)
        const userToken = response.data.token
        const userProfile = response.data.profile

        setToken(userToken)

        const cookies = {
          profile: userProfile,
          token: userToken,
        }
        // setUserProfile(userProfile)
        let expiresDate = '86400000' // A day after
        setCookie('BinnoxAdmin', cookies, {
          path: '/',
          maxAge: expiresDate,
        })
        navigate('/dashboard')
        toast.success('Welcome Back Admin')
      })
      .catch((error) => {
        setLoading(false)
        // console.log(error)
        if (error?.response?.status || error?.response?.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error?.response?.status || error?.response?.status === 404) {
          return toast.error(error.response.data.message)
        }
        toast.error(error.message)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className="">
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={(e) => loginUserFunction(e)}>
                    <h1>Admin Login</h1>
                    <p className="text-medium-emphasis">Admin Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" disabled={loading}>
                          {loading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5  d-none d-md-block">
                <CCardBody className="text-center">
                  <div>
                    <img className="sidebar-brand-narrow" src={logoSm} width={80} />
                    <h2>
                      Binnox Admin <br /> Login
                    </h2>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
