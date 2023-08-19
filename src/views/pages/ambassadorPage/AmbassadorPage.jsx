import React, { useContext, useEffect } from 'react'
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
import AmbassadorForm from './AmbassadorForm'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'

function AmbassadorPage() {
  const { ambassadorList, getAmbassadorRecordsFunction } = useContext(AdminContext)
  useEffect(() => {
    getAmbassadorRecordsFunction()
  }, [])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="d-flex justify-content-between">
              Ambassadors
              <ModalComponent title={'Invite Ambassador'} component={<AmbassadorForm />} />
            </div>
          </CCardHeader>
          <CCardBody>
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
                  <CTableHeaderCell>Ref Code</CTableHeaderCell>
                  <CTableHeaderCell>Ref User</CTableHeaderCell>
                  <CTableHeaderCell>Ref Ambassador</CTableHeaderCell>
                  <CTableHeaderCell>Reward</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ambassadorList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {ambassadorList.data.map((item, index) => {
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
                            <div>{item?.referralCode}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.userReferralsList?.length}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.ambassadorReferralsList?.length}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.rewordPoints}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <button>Action</button>
                          </CTableDataCell>
                          {/* <CTableDataCell>
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
                          </CTableDataCell> */}
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

export default AmbassadorPage
