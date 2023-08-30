import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminRecordPage() {
  const { adminRecords } = useContext(AdminContext)

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
                    <b>Total Delivery Fee</b> <br />₦{' '}
                    {adminRecords.totalDeliveryFee.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Total Transaction</b> <br />₦{' '}
                    {adminRecords.totalTransactions.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>10% of Transaction</b> <br />₦{' '}
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
    </>
  )
}

export default AdminRecordPage
