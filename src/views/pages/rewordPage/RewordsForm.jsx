import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { AdminContext } from 'src/context/adminContext'

function RewordsForm() {
  const [loading, setLoading] = React.useState(false)
  const [cookies] = useCookies()
  const { rewords, apiUrl, setModalComponentVisible, setRewords } = useContext(AdminContext)
  const [rewordsUpdate, setRewordsUpdate] = useState({})
  async function updateRewordFunction(e) {
    e.preventDefault()
    // return console.dir(e.target)

    const formElement = e.target

    // if (formElement[0].value === '') {
    //   return toast.info('Full name is Required')
    // }
    // if (formElement[1].value === '') {
    //   return toast.info('Phone is Required')
    // }
    // if (formElement[2].value === '') {
    //   return toast.info('Email is Required')
    // }

    // if (formElement[3].value !== formElement[4].value) {
    //   return toast.info('Password not equal to reset password')
    // }

    // return console.log({ rewordsUpdate })

    setLoading(true)
    // setLoading(true)
    const data = rewordsUpdate

    // return console.log(data)
    // axios POST request
    const options = {
      url: `${apiUrl}/admin/rewords`,
      method: 'PUT',
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
        setLoading(false)

        toast.success('Reward Updated Successfully')
        // getAmbassadorRecordsFunction()
        setRewords({ loading: false, data: response.data.updateReword })
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

  const handelChanges = (e) => {
    setRewordsUpdate((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={(e) => updateRewordFunction(e)}>
          <div className="row">
            <div className="col-md-6 my-2">
              <b className="d-block mb-2">User Referral User Reward</b>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder={`${rewords?.data?.user_refer_user_reword} point`}
                  name="user_refer_user_reword"
                  onChange={(e) => handelChanges(e)}
                />
              </CInputGroup>
            </div>
            <div className="col-md-6 my-2">
              <b className="d-block mb-2">Ambassador Referral User Reward</b>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder={`${rewords?.data?.ambassador_refer_user_reword} point`}
                  name="ambassador_refer_user_reword"
                  onChange={(e) => handelChanges(e)}
                />
              </CInputGroup>
            </div>
            <div className="col-md-6 my-2">
              <b className="d-block mb-2">Ambassador Referral Ambassador Reward</b>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder={`${rewords?.data?.ambassador_refer_ambassador_reword} point`}
                  name="ambassador_refer_ambassador_reword"
                  onChange={(e) => handelChanges(e)}
                />
              </CInputGroup>
            </div>
            <div className="col-md-6 my-2">
              <b className="d-block mb-2">Ambassador Referral Order Reward</b>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder={`${rewords?.data?.ambassador_down_line_order_reword} %`}
                  name="ambassador_down_line_order_reword"
                  onChange={(e) => handelChanges(e)}
                />
              </CInputGroup>
            </div>
            <div className="col-md-6 my-2">
              <b className="d-block mb-2">User Order Reward</b>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder={`${rewords?.data?.user_order_reword} %`}
                  name="user_order_reword"
                  onChange={(e) => handelChanges(e)}
                />
              </CInputGroup>
            </div>
            <CButton color="success" className="px-4" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Update Reward'}
            </CButton>
          </div>
        </CForm>
      </CCardBody>{' '}
    </CCard>
  )
}

export default RewordsForm
