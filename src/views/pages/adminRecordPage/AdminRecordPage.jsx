import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext, useState } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import LineChart from 'src/components/Chart/LineChat'
import { ChartTest } from 'src/components/Chart/ChartTest'

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
      {/* <LineChart /> */}
      <ChartTest />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {' '}
            <CCardHeader>
              <div className="d-flex justify-content-between">
                Admin Record
                {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
                <button className="btn btn-sm btn-primary" onClick={() => checkAdminAccess()}>
                  {' '}
                  Show Full Record{' '}
                </button>
              </div>
            </CCardHeader>
            <CCardBody>
              {adminRecords.loading ? (
                <>Loading...</>
              ) : (
                <div className="row">
                  <div className="col-md-6 my-2">
                    {/* {    totalTransactions: 0,
      transactions5percent: 0,
      totalDeliveryFee: 0,
      totalServiceFee: 0,
      groundTotal: 0,
      calculatedTransactions: 0,
      delivery10Percent: 0,
      calculatedDeliveryFee: 0,
      calculatedProfit: 0,} */}
                    <b>Total Service Fee</b> <br />₦{' '}
                    {adminRecords?.totalServiceFee?.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b> Delivery Fee</b> <br />₦ {adminRecords?.totalDeliveryFee?.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Transaction</b> <br />₦ {adminRecords?.totalTransactions?.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>5% of Transaction</b> <br />₦{' '}
                    {adminRecords?.transactions5percent?.toLocaleString()}
                  </div>
                  {/* <div className="col-md-6 my-2">
                    <b>Ground Total</b> <br />₦ {adminRecords?.groundTotal?.toLocaleString()}
                  </div> */}
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
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
                    {/*
                   <div className="col-md-6 my-2">
                    <b>User Referral User Reward</b> <br />
                    {rewords?.data?.user_refer_user_reword} point
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Ambassador Referral User Reward</b> <br />
                    {rewords?.data?.ambassador_refer_user_reword} point
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Ambassador Referral Ambassador Reward</b> <br />
                    {rewords?.data?.ambassador_refer_ambassador_reword} point
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Ambassador Referral Order Reward</b> <br />
                    {rewords?.data?.ambassador_down_line_order_reword}%
                  </div>
                  <div className="col-md-6 my-2">
                    <b>User Order Reward</b> <br />
                    {rewords?.data?.user_order_reword}%
                  </div> */}
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
