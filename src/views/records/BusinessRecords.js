import React from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
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

function BusinessRecords() {
  const { businessList, activeAccountFunction } = React.useContext(AdminContext)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Businesses</CCardHeader>
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
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  <CTableHeaderCell>Verification Docs</CTableHeaderCell>
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Availability</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {businessList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {businessList?.data?.map((item, index) => {
                      return (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={
                                item?.business_cover_image
                                  ? item?.business_cover_image
                                  : 'https://via.placeholder.com/600x400?text=Image'
                              }
                              status={item?.business_online ? 'success' : 'danger'}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.business_name}</div>
                            <div className="small text-medium-emphasis">
                              Type: {item?.business_type}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item?.business_email}{' '}
                              {item?.business_email_verified ? (
                                <>
                                  {' '}
                                  <div className="small text-medium-emphasis">Verified: True</div>
                                </>
                              ) : (
                                <div className="small text-medium-emphasis">Verified: False</div>
                              )}{' '}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item?.business_number}
                              {item?.number_verified ? (
                                <>
                                  {' '}
                                  <div className="small text-medium-emphasis">Verified: True</div>
                                </>
                              ) : (
                                <div className="small text-medium-emphasis">Verified: False</div>
                              )}{' '}
                              {/* </div> */}
                            </div>

                            {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              <b> CAC Dcc:</b>{' '}
                              {item?.business_verification_document?.cac_registration_doc
                                ? 'submitted'
                                : 'Not submitted'}
                            </div>
                            <div>
                              <b> CAC No:</b>{' '}
                              {item?.business_verification_document?.cac_registration_number
                                ? item?.business_verification_document?.cac_registration_number
                                : 'Not submitted'}
                            </div>
                            <div>
                              <b>Utility Bill:</b>{' '}
                              {item?.business_verification_document?.utility_bill
                                ? 'submitted'
                                : 'Not submitted'}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              <b> Lat:</b>{' '}
                              {item?.business_location?.lat
                                ? item?.business_location?.lat
                                : 'Not Set'}
                            </div>
                            <div>
                              <b> Long:</b>{' '}
                              {item?.business_location?.long
                                ? item?.business_location?.long
                                : 'Not Set'}
                            </div>
                          </CTableDataCell>

                          <CTableDataCell className="text-center">
                            <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item?.business_online ? 'Online' : 'Offline'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CDropdown variant="btn-group">
                              <CDropdownToggle color="primary">Actions</CDropdownToggle>
                              <CDropdownMenu>
                                {item.business_active ? (
                                  <CDropdownItem
                                    onClick={() =>
                                      activeAccountFunction(item.account_type, item._id)
                                    }
                                  >
                                    DeActivate {item.account_type}
                                  </CDropdownItem>
                                ) : (
                                  <CDropdownItem
                                    onClick={() =>
                                      activeAccountFunction(item.account_type, item._id)
                                    }
                                  >
                                    Activate {item.account_type}
                                  </CDropdownItem>
                                )}
                                {item.business_verified && item.account_type === 'business' ? (
                                  <CDropdownItem>DeVerify {item.account_type}</CDropdownItem>
                                ) : (
                                  <CDropdownItem>Verify {item.account_type}</CDropdownItem>
                                )}
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

export default BusinessRecords
