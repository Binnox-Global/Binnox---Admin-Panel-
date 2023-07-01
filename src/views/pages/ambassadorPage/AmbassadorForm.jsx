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

function AmbassadorForm() {
  const [cookies] = useCookies()
  const [loading, setLoading] = React.useState(false)
  const { apiUrl, getAmbassadorRecordsFunction, setModalComponentVisible } =
    React.useContext(AdminContext)
  async function registerAmbassadorFunction(e) {
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
      referral: formElement[5].value,
    }

    // return console.log(data)
    // axios POST request
    const options = {
      url: `${apiUrl}/admin/ambassador`,
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

        toast.success('Ambassador created successfully')
        getAmbassadorRecordsFunction()
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
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm onSubmit={(e) => registerAmbassadorFunction(e)}>
            <h1>Register</h1>
            <p className="text-medium-emphasis">Create Ambassador</p>
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
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Referral" />
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
    </>
  )
}

export default AmbassadorForm
