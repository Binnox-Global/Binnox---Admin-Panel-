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

function Orders() {
  const { orderList } = React.useContext(AdminContext)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Orders</CCardHeader>
          <CCardBody>
            {/* <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                label="Radio 1"
                defaultChecked
              />
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                label="Radio 2"
              />
              <CFormCheck
                type="radio"
                button={{ color: 'primary', variant: 'outline' }}
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                label="Radio 3"
              />
            </CButtonGroup> */}
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Location</CTableHeaderCell>
                  <CTableHeaderCell>Count</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell>Statues</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orderList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {orderList.data.map((item, index) => {
                      return (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              // src={item?.user?.user_avatar}
                              src="https://via.placeholder.com/600x400?text=Image"
                              status={'success'}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.product?.name}</div>
                            <div className="small text-medium-emphasis">
                              Business: {item?.user?.business_name}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.user?.full_name}</div>
                            <div className="small text-medium-emphasis">
                              Email: {item?.user?.email} || Contact: {item?.user?.phone_number}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {/* <CIcon size="xl" icon={item?.address} title={item?.country?.name} /> */}
                            <div>{item?.address}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.item_count}</div>
                            {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {/* <CIcon size="xl" icon={item?.item_amount} /> */}
                            <div>₦{item?.item_amount}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <div className="small text-medium-emphasis">Last login</div> */}
                            <div>{item?.statues}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CDropdown variant="btn-group">
                              <CDropdownToggle color="primary">Actions</CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem>Action</CDropdownItem>
                                {/* <CDropdownItem href="#">Another action</CDropdownItem>
                                <CDropdownItem href="#">Something else here</CDropdownItem>
                                <CDropdownDivider />
                                <CDropdownItem href="#">Separated link</CDropdownItem> */}
                              </CDropdownMenu>
                            </CDropdown>
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

export default Orders
