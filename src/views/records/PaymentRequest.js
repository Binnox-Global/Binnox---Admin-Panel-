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

function PaymentRequest() {
  const { token, paymentRequest, updatePaymentRequestStatusFunction, getPaymentRequestFunction } =
    React.useContext(AdminContext)
  React.useEffect(() => {
    if (token) getPaymentRequestFunction()
  }, [])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Payment Request</CCardHeader>
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
                  <CTableHeaderCell>Bank Name</CTableHeaderCell>
                  <CTableHeaderCell>Account Number</CTableHeaderCell>
                  <CTableHeaderCell>Account Name</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paymentRequest.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {paymentRequest.data.map((item, index) => {
                      if (!item.pending) return
                      return (
                        <CTableRow v-for="item in tableItems" key={index}>
                          {/* <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={
                                item?.user_avatar
                                  ? item?.user_avatar
                                  : 'https://via.placeholder.com/600x400?text=Image'
                              }
                              status={item?.account_active ? 'success' : 'danger'}
                            />
                          </CTableDataCell> */}
                          <CTableDataCell>
                            <div>{item?.business?.business_name}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>₦{item?.amount.toLocaleString()} </div>
                          </CTableDataCell>
                          {/* <CTableDataCell>
                            <div>
                              {item?.phone_number}
                              {item?.number_verified ? (
                                <>
                                  {' '}
                                  <div className="small text-medium-emphasis">Verified: True</div>
                                </>
                              ) : (
                                <div className="small text-medium-emphasis">Verified: False</div>
                              )}{' '}
                            </div>
                          </CTableDataCell> */}
                          <CTableDataCell>
                            <div>{item?.approved ? 'Approved' : null}</div>
                            <div>{item?.pending ? 'Pending' : null}</div>
                            <div>{item?.rejected ? 'Rejected' : null}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {item?.business?.saved_bank_account[0]?.bank_name}
                          </CTableDataCell>
                          <CTableDataCell>
                            {item?.business?.saved_bank_account[0]?.account_number}
                          </CTableDataCell>
                          <CTableDataCell>
                            {item?.business?.saved_bank_account[0]?.account_name}
                          </CTableDataCell>
                          <CTableDataCell style={{ maxWidth: '100px' }}>
                            {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CDropdown variant="btn-group">
                              <CDropdownToggle color="primary">Actions</CDropdownToggle>
                              <CDropdownMenu>
                                {/* {item.account_active ? ( */}
                                <CDropdownItem
                                  onClick={() =>
                                    updatePaymentRequestStatusFunction(item._id, {
                                      pending: false,
                                      approved: true,
                                      rejected: false,
                                    })
                                  }
                                >
                                  Approve
                                </CDropdownItem>
                                {/* ) : ( */}
                                <CDropdownItem
                                  onClick={() =>
                                    updatePaymentRequestStatusFunction(item._id, {
                                      pending: false,
                                      approved: false,
                                      rejected: true,
                                    })
                                  }
                                >
                                  Reject
                                </CDropdownItem>
                                {/* )} */}
                              </CDropdownMenu>
                            </CDropdown>
                            {/* </CTableDataCell> */}
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
  )
}

export default PaymentRequest
