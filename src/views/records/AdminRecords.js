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
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
import Register from '../pages/register/Register'

function AdminRecords() {
  const { adminList, activeAccountFunction } = React.useContext(AdminContext)

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              Admins
              <ModalComponent title={'Create Admin'} component={<Register />} />
            </div>
          </CCardHeader>
          <CCardBody>
            {/* <CButtonGroup
              role="group"
              aria-label="Basic checkbox toggle button group"
              className="my-2"
            >
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
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {adminList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {adminList.data.map((item, index) => {
                      return (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={
                                item?.user_avatar
                                  ? item?.user_avatar
                                  : 'https://via.placeholder.com/600x400?text=Image'
                              }
                              status={item?.account_active ? 'success' : 'danger'}
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.full_name}</div>
                            <div className="small text-medium-emphasis">
                              Type: {item?.account_type}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              {item?.email}{' '}
                              {item?.email_verified ? (
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
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.account_active ? 'Active' : 'Deactivated'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CTableDataCell>
                              <CDropdown variant="btn-group">
                                <CDropdownToggle color="primary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  {item.account_active ? (
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
                                </CDropdownMenu>
                              </CDropdown>
                            </CTableDataCell>
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

export default AdminRecords
