import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CCardHeader,
  CCol,
  CRow,
  CFormSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilNoteAdd, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { AdminContext } from 'src/context/adminContext'
import { toast } from 'react-toastify'

function CreateDiscountCodePage() {
  const [cookies] = useCookies()
  const [loading, setLoading] = React.useState(false)
  const { apiUrl } = React.useContext(AdminContext)
  const [discountCodeForm, setDiscountCodeForm] = React.useState({
    code: '',
    discount: '',
    active: true,
    max_valid_count: '',
    description: '',
  })

  async function createDiscountCodeFunction(e) {
    e.preventDefault()
    // return console.dir(discountCodeForm)

    if (discountCodeForm.code === '') {
      return toast.info('Discount Code Required')
    }
    if (discountCodeForm.discount === '') {
      return toast.info('Discount % is Required')
    }
    if (discountCodeForm.max_valid_count === '') {
      return toast.info('Max Valid is Required')
    }

    if (discountCodeForm.description === '') {
      return toast.info('Description is Required')
    }

    setLoading(true)
    // setLoading(true)
    const data = {
      ...discountCodeForm,
    }
    // axios POST request
    const options = {
      url: `${apiUrl}/admin/discount`,
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

        toast.success('Code Created Successfully')
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

  const handelChanges = (e) => {
    setDiscountCodeForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const handelCheckChanges = (e) => {
    setDiscountCodeForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.checked,
      }
    })
  }
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Create discount</CCardHeader>
          <CCardBody>
            <CForm onSubmit={(e) => createDiscountCodeFunction(e)}>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Discount Code"
                  autoComplete={false}
                  onChange={(e) => handelChanges(e)}
                  name="code"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                {/* <CInputGroupText> */}
                {/* <CIcon icon={cilUser} /> */}
                <CInputGroupText>%</CInputGroupText>
                {/* </CInputGroupText> */}
                <CFormInput
                  placeholder="Discount percent"
                  autoComplete={false}
                  onChange={(e) => handelChanges(e)}
                  name="discount"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilLockLocked} />
                </CInputGroupText>
                <CFormInput
                  type="number"
                  placeholder="Max usage"
                  autoComplete={false}
                  onChange={(e) => handelChanges(e)}
                  name="max_valid_count"
                />
              </CInputGroup>
              <CInputGroup className="mb-2">
                <CInputGroupText>
                  <CIcon icon={cilNoteAdd} />
                </CInputGroupText>
                <textarea
                  rows="3"
                  className="form-control"
                  onChange={(e) => handelChanges(e)}
                  name="description"
                ></textarea>
              </CInputGroup>
              <div>
                {/* <ChecksRadios /> */}{' '}
                <CFormSwitch
                  label="Discount Code will be active by default"
                  id="discountState"
                  defaultChecked
                  className="mb-3"
                  onChange={(e) => handelCheckChanges(e)}
                  // onChange={(e) => console.dir(e.target.checked)}
                  name="active"
                />
              </div>
              <div className="d-grid">
                <CButton
                  color="success"
                  className="px-4 text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Create Discount Code'}
                </CButton>
                {/* <CButton color="success"></CButton> */}
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CreateDiscountCodePage
