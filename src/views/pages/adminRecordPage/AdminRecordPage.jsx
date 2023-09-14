import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext, useState } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminRecordPage() {
  const { adminRecords } = useContext(AdminContext)
  const [adminAccess, setAdminAccess] = useState(false)

  function checkAdminAccess() {
    const userInput = window.prompt('Enter Admin Access Code')
    if (userInput !== null) {
      if (userInput.trim() === '') {
        return alert('Enter An Admin Access Code')
      }

      if (userInput !== 'victor') {
        return alert('Invalid Admin Access Code')
      }
      setAdminAccess(true)
    } else {
      setAdminAccess(false)
      alert('Enter Admin Access Code')
    }
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {' '}
            <CCardHeader>
              <div className="d-flex justify-content-between">
                Admin Record
                {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
                <button className="btn btn-primary btn-sm" onClick={() => checkAdminAccess()}>
                  Show Full Record
                </button>
              </div>
            </CCardHeader>
            <CCardBody>
              {adminRecords.loading ? (
                <>Loading...</>
              ) : (
                <div className="row">
                  <div className="col-md-6 my-2">
                    <b>Total Service Fee</b> <br />₦ {adminRecords.totalServiceFee.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Delivery Fee</b> <br />₦{' '}
                    {adminRecords.calculatedDeliveryFee.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Total Transaction</b> <br />₦{' '}
                    {adminRecords.totalTransactions.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>5% of Transaction</b> <br />₦{' '}
                    {adminRecords.transactions5percent.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Ground Total</b> <br />₦ {adminRecords.groundTotal.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Profit</b> <br />₦ {adminRecords.calculatedProfit.toLocaleString()}
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>{' '}
      {adminAccess && (
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              {' '}
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  Admin Record
                  {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
                  <button className="btn btn-sm btn-primary" onClick={() => setAdminAccess(false)}>
                    {' '}
                    Hide Full Record{' '}
                  </button>
                </div>
              </CCardHeader>
              <CCardBody>
                {adminRecords.loading ? (
                  <>Loading...</>
                ) : (
                  <div className="row">
                    <div className="col-md-6 my-2">
                      <b>Total Service Fee</b> <br />₦{' '}
                      {adminRecords.totalServiceFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Delivery Fee</b> <br />₦{' '}
                      {adminRecords.totalDeliveryFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Transaction</b> <br />₦{' '}
                      {adminRecords.totalTransactions.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>5% of Transaction</b> <br />₦{' '}
                      {adminRecords.transactions5percent.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Ground Total</b> <br />₦ {adminRecords.groundTotal.toLocaleString()}
                    </div>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default AdminRecordPage
