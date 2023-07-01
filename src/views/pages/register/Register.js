import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { AdminContext } from 'src/context/adminContext'
import { toast } from 'react-toastify'

const Register = () => {
  const [cookies] = useCookies()
  const [loading, setLoading] = React.useState(false)
  const { apiUrl, getAdminRecordsFunction, setModalComponentVisible } =
    React.useContext(AdminContext)
  async function registerAdminFunction(e) {
    e.preventDefault()
    // return console.dir(e.target)

    const formElement = e.target

    if (formElement[0].value === '') {
      return toast.info('Full name is Required')
    }
    if (formElement[1].value === '') {
      return toast.info('Phone is Required')
    }
    if (formElement[2].value === '') {
      return toast.info('Email is Required')
    }

    if (formElement[3].value !== formElement[4].value) {
      return toast.info('Password not equal to reset password')
    }

    setLoading(true)
    // setLoading(true)
    const data = {
      full_name: formElement[0].value,
      phone_number: formElement[1].value,
      email: formElement[2].value,
      password: formElement[3].value,
    }
    // axios POST request
    const options = {
      url: `${apiUrl}/admin/register`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: cookies?.BinnoxAdmin?.token,
      },
      data: data,
    }
    // setLoading(false)
    // return console.log(data)

    axios(options)
      .then((response) => {
        console.log(response.data)
        setLoading(false)

        toast.success('Admin created successfully')
        getAdminRecordsFunction()
        setModalComponentVisible(false)
      })
      .catch((error) => {
        setLoading(false)
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
  return (
    <>
      {/* // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    // <CContainer> */}
      {/* <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}> */}
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm onSubmit={(e) => registerAdminFunction(e)}>
            <h1>Register</h1>
            <p className="text-medium-emphasis">Create admin account</p>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput placeholder="Full name" autoComplete="username" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput placeholder="Phone Number" autoComplete="number" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput placeholder="Email" autoComplete="email" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput type="password" placeholder="Password" autoComplete="new-password" />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </CInputGroup>
            <div className="d-grid">
              <CButton color="success" className="px-4" type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create Account'}
              </CButton>
              {/* <CButton color="success"></CButton> */}
            </div>
          </CForm>
        </CCardBody>
      </CCard>
      {/* </CCol>
        </CRow> */}
      {/* // </CContainer>
    // </div> */}
    </>
  )
}

export default Register
