import React, { useEffect, useState } from 'react'

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
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

function UserRecords({ show_max }) {
  const { userList, activeAccountFunction } = React.useContext(AdminContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const filterUserList = () => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const newFilteredData = userList.data.filter((item) => {
      const fullName = item.full_name.toLowerCase()
      const email = item.email.toLowerCase()
      const phoneNumber = `0${item.phone_number?.toString()}`
      return (
        fullName.includes(lowerCaseQuery) ||
        email.includes(lowerCaseQuery) ||
        phoneNumber.includes(lowerCaseQuery)
      )
    })
    setFilteredData(newFilteredData)
  }
  useEffect(() => {
    filterUserList() // Call the filtering function
  }, [searchQuery])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            Users{' '}
            <div className="ms-auto">
              {show_max ? (
                <>
                  <Link to={'/records/users'}>Open More</Link>
                </>
              ) : null}
            </div>
          </CCardHeader>
          <CCardBody>
            <input
              type="text"
              placeholder="Search by name, email, or number"
              value={searchQuery}
              className="form-control w-100 w-sm-100 w-md-50 w-lg-33 mb-3"
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
            />
            <CTable
              align="middle"
              className="mb-0 border"
              hover
              responsive
              style={{ overflow: 'visible' }}
            >
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  <CTableHeaderCell>Activity</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '140px' }}>Ref By</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '140px' }}>Registered At</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {userList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {searchQuery
                      ? filteredData.map((item, index) => {
                          if (show_max != null && index > show_max) {
                            return
                          }
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
                                      <div className="small text-medium-emphasis">
                                        Verified: True
                                      </div>
                                    </>
                                  ) : (
                                    <div className="small text-medium-emphasis">
                                      Verified: False
                                    </div>
                                  )}{' '}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>
                                  0{item?.phone_number}
                                  {item?.number_verified ? (
                                    <>
                                      {' '}
                                      <div className="small text-medium-emphasis">
                                        Verified: True
                                      </div>
                                    </>
                                  ) : (
                                    <div className="small text-medium-emphasis">
                                      Verified: False
                                    </div>
                                  )}{' '}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item?.account_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>{item?.ambassadorReferral?.full_name || '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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
                        })
                      : userList.data.map((item, index) => {
                          if (show_max != null && index > show_max) {
                            return
                          }
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
                                      <div className="small text-medium-emphasis">
                                        Verified: True
                                      </div>
                                    </>
                                  ) : (
                                    <div className="small text-medium-emphasis">
                                      Verified: False
                                    </div>
                                  )}{' '}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>
                                  0{item?.phone_number}
                                  {item?.number_verified ? (
                                    <>
                                      {' '}
                                      <div className="small text-medium-emphasis">
                                        Verified: True
                                      </div>
                                    </>
                                  ) : (
                                    <div className="small text-medium-emphasis">
                                      Verified: False
                                    </div>
                                  )}{' '}
                                </div>
                              </CTableDataCell>
                              <CTableDataCell>
                                <div>{item?.account_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>{item?.ambassadorReferral?.full_name || '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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

UserRecords.propTypes = {
  show_max: PropTypes.number,
}

export default UserRecords
