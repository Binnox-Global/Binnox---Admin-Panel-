import React from 'react'

import {
  CAvatar,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'

import { AdminContext } from 'src/context/adminContext'
import moment from 'moment'

function PaymentRequestHistory() {
  const [payoutTotal, setPayoutTotal] = React.useState(0)
  const [requestTotal, setRequestTotal] = React.useState(0)
  const {
    paymentRequest,
    updatePaymentRequestStatusFunction,
    getPaymentRequestFunction,
    instantPayment,
    getInstantPaymentRecordFunction,
  } = React.useContext(AdminContext)
  React.useEffect(() => {
    getPaymentRequestFunction()
    getInstantPaymentRecordFunction()
  }, [])

  React.useEffect(() => {
    let totalAmount = 0
    instantPayment.data.forEach((payout) => {
      totalAmount += payout?.amount
    })
    setPayoutTotal(totalAmount)
  }, [instantPayment])
  React.useEffect(() => {
    // console.log({ paymentRequest })
    let totalAmount = 0
    paymentRequest?.history?.forEach((payout) => {
      totalAmount += payout?.amount
    })
    setRequestTotal(totalAmount)
  }, [paymentRequest])
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between ">
              Instant Payment History{' '}
              <b className="d-block ">Total: {payoutTotal.toLocaleString()}</b>
            </CCardHeader>
            <CCardBody>
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                style={{ overflow: 'visible' }}
              >
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell> */}
                    <CTableHeaderCell>Business Name</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    {/* <CTableHeaderCell>Contact</CTableHeaderCell> */}
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {instantPayment.loading ? (
                    <>loading...</>
                  ) : (
                    <>
                      {/* {console.log('Request', paymentRequest)} */}
                      {instantPayment?.data?.map((item, index) => {
                        // if (!item.pending) return
                        return (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                              <div>{item?.business?.business_name}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>₦{item?.amount.toLocaleString()} </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.status} </div>
                            </CTableDataCell>
                            {/* <CTableDataCell>
                              <div>{item?.approved ? 'Approved' : null}</div>
                              <div>{item?.pending ? 'Pending' : null}</div>
                              <div>{item?.rejected ? 'Rejected' : null}</div>
                            </CTableDataCell> */}
                            <CTableDataCell>
                              {moment(item?.updatedAt).format('MMM Do YY, h:mm a')}
                              {/* {item?.updatedAt.split('T')[0]} */}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      })}
                    </>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between ">
              Payment Request History
              <b className="d-block ">Total: {requestTotal.toLocaleString()}</b>
            </CCardHeader>

            <CCardBody>
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                style={{ overflow: 'visible' }}
              >
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell> */}
                    <CTableHeaderCell>Business Name</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    {/* <CTableHeaderCell>Contact</CTableHeaderCell> */}
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {paymentRequest.loading ? (
                    <>loading...</>
                  ) : (
                    <>
                      {/* {console.log('Request', paymentRequest)} */}
                      {paymentRequest?.history?.map((item, index) => {
                        // if (!item.pending) return
                        return (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>
                              <div>{item?.business?.business_name}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>₦{item?.amount.toLocaleString()} </div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.approved ? 'Approved' : null}</div>
                              <div>{item?.pending ? 'Pending' : null}</div>
                              <div>{item?.rejected ? 'Rejected' : null}</div>
                            </CTableDataCell>
                            <CTableDataCell>{item?.updatedAt.split('T')[0]}</CTableDataCell>
                          </CTableRow>
                        )
                      })}
                    </>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>{' '}
    </>
  )
}

export default PaymentRequestHistory
