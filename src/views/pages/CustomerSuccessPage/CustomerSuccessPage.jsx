import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext, useState } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function CustomerSuccessPage() {
  const { apiUrl } = useContext(AdminContext)
  const handleDownload = (data) => {
    let route = null
    if (data === 'USER_NUMBER') {
      route = `${apiUrl}/customer-success/download-users-contacts`
    }
    if (data === 'USER_ORDER_CONTACT') {
      route = `${apiUrl}/customer-success/download-orders-users-name-number-csv`
    }
    if (data === 'USER_NAME_EMAIL') {
      route = `${apiUrl}/customer-success/download-users-email-name-csv`
    }
    if (!route) return

    // Open a new browser tab or window for the download
    const newTab = window.open(`${route}`, '_blank')
    if (newTab) {
      newTab.focus()
    } else {
      // If the pop-up blocker prevents opening a new tab, provide a message or alternative option
      console.error(
        'Unable to open a new tab for the download. Check your pop-up blocker settings.',
      )
      // You can also provide a fallback link for manual download
      // Make a GET request to the backend endpoint to download the contacts
      window.location.href = `${route}`
    }
  }
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          {' '}
          <CCardHeader>
            <div className="d-flex justify-content-between">
              Customer Success
              {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              <div className="col-md-12 m-2 d-flex justify-content-between w-100 ">
                <b>Download Current User Contacts</b>{' '}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDownload('USER_NUMBER')}
                >
                  Download TXT file
                </button>
              </div>
              <div className="col-md-12 m-2 d-flex justify-content-between w-100 ">
                <b>Download Orders Contacts</b>{' '}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDownload('USER_ORDER_CONTACT')}
                >
                  Download CSV file
                </button>
              </div>
              <div className="col-md-12 m-2 d-flex justify-content-between w-100 ">
                <b>Download Current UserName and Email</b>{' '}
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleDownload('USER_NAME_EMAIL')}
                >
                  Download CSV file
                </button>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CustomerSuccessPage
