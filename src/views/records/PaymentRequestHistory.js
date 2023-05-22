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

function PaymentRequestHistory() {
  const { paymentRequest, updatePaymentRequestStatusFunction, getPaymentRequestFunction } =
    React.useContext(AdminContext)
  React.useEffect(() => {
    getPaymentRequestFunction()
  }, [])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Payment Request History</CCardHeader>
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
                            <div>₦{item?.amount} </div>
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
    </CRow>
  )
}

export default PaymentRequestHistory