import React, { useEffect, useState } from 'react'

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
import { LocationDropdown } from '../orders/Orders'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

function BusinessRecords() {
  return (
    <>
      <ActiveBusinessRecords />
      <OtherBusinessRecords />
    </>
  )
}

export default BusinessRecords

export function ActiveBusinessRecords({ show_max }) {
  const { businessList, activeAccountFunction, verifyAccountFunction } =
    React.useContext(AdminContext)

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const filterBusinessList = () => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const newFilteredData = businessList?.active?.filter((item) => {
      const fullName = item?.business_name.toLowerCase()
      const email = item?.business_email.toLowerCase()
      const phoneNumber = `0${item?.business_number?.toString()}`
      return (
        fullName.includes(lowerCaseQuery) ||
        email.includes(lowerCaseQuery) ||
        phoneNumber.includes(lowerCaseQuery)
      )
    })
    setFilteredData(newFilteredData)
  }
  useEffect(() => {
    filterBusinessList() // Call the filtering function
  }, [searchQuery])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            Active Businesses{' '}
            <div className="ms-auto">
              {show_max ? (
                <>
                  <Link to={'/records/businesses'}>Open More</Link>
                </>
              ) : (
                <div className="ms-auto badge bg-primary d-block py-2">
                  {searchQuery !== '' ? <>{filteredData?.length} / </> : null}
                  {businessList?.active?.length}
                </div>
              )}
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <input
                type="text"
                placeholder="Search by name, email, or number"
                value={searchQuery}
                className="form-control w-100 w-sm-100 w-md-50 w-lg-33 mb-3"
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                }}
              />
              {searchQuery !== '' ? (
                <button
                  className="btn btn-sm btn-primary mb-3 px-3"
                  onClick={() => setSearchQuery('')}
                >
                  x
                </button>
              ) : null}
            </div>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  {/* <CTableHeaderCell>Verification Docs</CTableHeaderCell> */}
                  {!show_max && <CTableHeaderCell>Location</CTableHeaderCell>}
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Wallet</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Verified</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '140px' }}>Registered At</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {businessList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {searchQuery
                      ? filteredData?.map((item, index) => {
                          return (
                            <CTableRow v-for="item in tableItems" key={index}>
                              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
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
                                  {item?.business_number}
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
                                  {/* </div> */}
                                </div>

                                {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                              </CTableDataCell>
                              {/* <CTableDataCell>
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
                          </CTableDataCell> */}
                              <CTableDataCell className="text-center">
                                {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <LocationDropdown
                                    location={`https://www.google.com/maps/search/?api=1&query=${item?.business_location?.lat},${item?.business_location?.long}`}
                                  />
                                ) : (
                                  '--'
                                )}
                              </CTableDataCell>
                              {/* <CTableDataCell className="text-center">
                            {item?.business_location?.lat &&
                            item?.business_location?.long &&
                            item?.business_location?.lat !== '' &&
                            item?.business_location?.long !== '' ? (
                              <>
                                {' '}
                                {getLocationAddress(
                                  item?.business_location?.lat,
                                  item?.business_location?.long,
                                )}
                              </>
                            ) : (
                              '--'
                            )}
                          </CTableDataCell> */}
                              {/* <GetLocation
                            longitude={item?.business_location?.long}
                            latitude={item?.business_location?.lat}
                          /> */}
                              {!show_max && (
                                <>
                                  {item?.business_location?.lat &&
                                  item?.business_location?.long &&
                                  item?.business_location?.lat !== '' &&
                                  item?.business_location?.long !== '' ? (
                                    <GetLocation
                                      longitude={item?.business_location?.long}
                                      latitude={item?.business_location?.lat}
                                    />
                                  ) : (
                                    <CTableDataCell className="text-center">--</CTableDataCell>
                                  )}
                                </>
                              )}

                              <CTableDataCell className="">
                                <div>
                                  ₦
                                  {item?.wallet?.balance !== null &&
                                  item?.wallet?.balance !== undefined
                                    ? item?.wallet?.balance.toLocaleString()
                                    : '--'}
                                </div>
                              </CTableDataCell>

                              <CTableDataCell className="text-center">
                                <div>{item?.business_products?.length}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_verified ? 'Verified' : '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        DeVerify {item.account_type}
                                      </CDropdownItem>
                                    ) : (
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        Verify {item.account_type}
                                      </CDropdownItem>
                                    )}
                                  </CDropdownMenu>
                                </CDropdown>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      : businessList?.active?.map((item, index) => {
                          return (
                            <CTableRow v-for="item in tableItems" key={index}>
                              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
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
                                  {item?.business_number}
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
                                  {/* </div> */}
                                </div>

                                {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                              </CTableDataCell>
                              {/* <CTableDataCell>
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
                          </CTableDataCell> */}
                              <CTableDataCell className="text-center">
                                {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <LocationDropdown
                                    location={`https://www.google.com/maps/search/?api=1&query=${item?.business_location?.lat},${item?.business_location?.long}`}
                                  />
                                ) : (
                                  '--'
                                )}
                              </CTableDataCell>
                              {/* <CTableDataCell className="text-center">
                            {item?.business_location?.lat &&
                            item?.business_location?.long &&
                            item?.business_location?.lat !== '' &&
                            item?.business_location?.long !== '' ? (
                              <>
                                {' '}
                                {getLocationAddress(
                                  item?.business_location?.lat,
                                  item?.business_location?.long,
                                )}
                              </>
                            ) : (
                              '--'
                            )}
                          </CTableDataCell> */}
                              {/* <GetLocation
                            longitude={item?.business_location?.long}
                            latitude={item?.business_location?.lat}
                          /> */}
                              {!show_max && (
                                <>
                                  {item?.business_location?.lat &&
                                  item?.business_location?.long &&
                                  item?.business_location?.lat !== '' &&
                                  item?.business_location?.long !== '' ? (
                                    <GetLocation
                                      longitude={item?.business_location?.long}
                                      latitude={item?.business_location?.lat}
                                    />
                                  ) : (
                                    <CTableDataCell className="text-center">--</CTableDataCell>
                                  )}
                                </>
                              )}
                              <CTableDataCell className="">
                                <div>
                                  ₦
                                  {item?.wallet?.balance !== null &&
                                  item?.wallet?.balance !== undefined
                                    ? item?.wallet?.balance.toLocaleString()
                                    : '--'}
                                </div>
                              </CTableDataCell>

                              <CTableDataCell className="text-center">
                                <div>{item?.business_products?.length}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_verified ? 'Verified' : '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        DeVerify {item.account_type}
                                      </CDropdownItem>
                                    ) : (
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        Verify {item.account_type}
                                      </CDropdownItem>
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

      {/* <CCol>
        <OtherBusinessRecords />
      </CCol> */}
    </CRow>
  )
}

ActiveBusinessRecords.propTypes = {
  show_max: PropTypes.number,
}
export function OtherBusinessRecords() {
  const { businessList, activeAccountFunction, verifyAccountFunction } =
    React.useContext(AdminContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const filterBusinessList = () => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    const newFilteredData = businessList?.others?.filter((item) => {
      const fullName = item.business_name.toLowerCase()
      const email = item.business_email.toLowerCase()
      const phoneNumber = `0${item.business_number?.toString()}`
      return (
        fullName.includes(lowerCaseQuery) ||
        email.includes(lowerCaseQuery) ||
        phoneNumber.includes(lowerCaseQuery)
      )
    })
    setFilteredData(newFilteredData)
  }
  useEffect(() => {
    filterBusinessList() // Call the filtering function
  }, [searchQuery])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">
            Other Businesses{' '}
            <div className="ms-auto badge bg-primary d-block py-2">
              {searchQuery !== '' ? <>{filteredData?.length} / </> : null}
              {businessList?.others?.length}
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
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  {/* <CTableHeaderCell>Verification Docs</CTableHeaderCell> */}
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  {/* <CTableHeaderCell>Address</CTableHeaderCell> */}
                  <CTableHeaderCell>Wallet</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Verified</CTableHeaderCell>
                  <CTableHeaderCell style={{ minWidth: '130px' }}>Registered At</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {businessList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {searchQuery
                      ? filteredData?.map((item, index) => {
                          return (
                            <CTableRow v-for="item in tableItems" key={index}>
                              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
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
                                  {item?.business_number}
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
                                  {/* </div> */}
                                </div>

                                {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <LocationDropdown
                                    location={`https://www.google.com/maps/search/?api=1&query=${item?.business_location?.lat},${item?.business_location?.long}`}
                                  />
                                ) : (
                                  '--'
                                )}
                              </CTableDataCell>

                              {/* <CTableDataCell className="text-center">
                                {/* {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <GetLocation
                                    longitude={item?.business_location?.long}
                                    latitude={item?.business_location?.lat}
                                  /> 
                                ) : (* /}
                                <>--</>
                                {/* // )} * /}
                              </CTableDataCell> */}

                              <CTableDataCell className="">
                                <div>
                                  ₦
                                  {item?.wallet?.balance !== null &&
                                  item?.wallet?.balance !== undefined
                                    ? item?.wallet?.balance.toLocaleString()
                                    : '--'}
                                </div>
                              </CTableDataCell>

                              <CTableDataCell className="text-center">
                                <div>{item?.business_products?.length}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_verified ? 'Verified' : '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        DeVerify {item.account_type}
                                      </CDropdownItem>
                                    ) : (
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        Verify {item.account_type}
                                      </CDropdownItem>
                                    )}
                                  </CDropdownMenu>
                                </CDropdown>
                              </CTableDataCell>
                            </CTableRow>
                          )
                        })
                      : businessList?.others?.map((item, index) => {
                          return (
                            <CTableRow v-for="item in tableItems" key={index}>
                              <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
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
                                  {item?.business_number}
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
                                  {/* </div> */}
                                </div>

                                {/* <CProgress thin color={item?.usage?.color} value={item?.usage?.value} /> */}
                              </CTableDataCell>
                              {/* <CTableDataCell>
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
                          </CTableDataCell> */}
                              <CTableDataCell className="text-center">
                                {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <LocationDropdown
                                    location={`https://www.google.com/maps/search/?api=1&query=${item?.business_location?.lat},${item?.business_location?.long}`}
                                  />
                                ) : (
                                  '--'
                                )}
                              </CTableDataCell>
                              {/* <CTableDataCell className="text-center">
                            {item?.business_location?.lat &&
                            item?.business_location?.long &&
                            item?.business_location?.lat !== '' &&
                            item?.business_location?.long !== '' ? (
                              <>
                                {' '}
                                {getLocationAddress(
                                  item?.business_location?.lat,
                                  item?.business_location?.long,
                                )}
                              </>
                            ) : (
                              '--'
                            )}
                          </CTableDataCell> */}
                              {/* <GetLocation
                            longitude={item?.business_location?.long}
                            latitude={item?.business_location?.lat}
                          /> */}
                              {/* <>
                                {item?.business_location?.lat &&
                                item?.business_location?.long &&
                                item?.business_location?.lat !== '' &&
                                item?.business_location?.long !== '' ? (
                                  <GetLocation
                                    longitude={item?.business_location?.long}
                                    latitude={item?.business_location?.lat}
                                  />
                                ) : (
                                  <CTableDataCell className="text-center">--</CTableDataCell>
                                )}
                              </> */}

                              <CTableDataCell className="">
                                <div>
                                  ₦
                                  {item?.wallet?.balance !== null &&
                                  item?.wallet?.balance !== undefined
                                    ? item?.wallet?.balance.toLocaleString()
                                    : '--'}
                                </div>
                              </CTableDataCell>

                              <CTableDataCell className="text-center">
                                <div>{item?.business_products?.length}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                              </CTableDataCell>
                              <CTableDataCell className="text-center">
                                <div>{item?.business_verified ? 'Verified' : '--'}</div>
                              </CTableDataCell>
                              <CTableDataCell>
                                {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                                <div>
                                  {moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}
                                </div>
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
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        DeVerify {item.account_type}
                                      </CDropdownItem>
                                    ) : (
                                      <CDropdownItem
                                        onClick={() =>
                                          verifyAccountFunction(item.account_type, item._id)
                                        }
                                      >
                                        Verify {item.account_type}
                                      </CDropdownItem>
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

export function GetLocation({ latitude, longitude }) {
  const [addressLoading, setAddressLoading] = useState(true)
  const [address, setAddress] = useState({})
  useEffect(() => {
    if (latitude === null || longitude === null) {
      return
    }
    // console.log('Location', latitude, longitude)
    // Call the function to fetch the address when component mounts or when the latitude and longitude change
    getLocationAddress(latitude, longitude)
    // setAddressLoading
  }, [latitude, longitude])
  // if (!latitude || !longitude) {
  //   return '--'
  // }

  function getLocationAddress(latitude, longitude) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json
`,
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log({ data })
        setAddress(data.address)
        setAddressLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching geocode data:', error)
      })
  }

  // useEffect(() => {
  //   // console.log('address', address)
  //   // setAddressLoading
  // }, [address])

  return (
    <CTableDataCell className="text-center">
      {/* {address !== '' ? address : '--'} */}
      {/* Address */}
      {addressLoading
        ? 'Loading...'
        : ` ${address.road ? `${address?.road}` : ''} ${
            address.suburb ? `,${address?.suburb}` : ''
          }`}
    </CTableDataCell>
  )
}

GetLocation.propTypes = {
  latitude: PropTypes.number,

  longitude: PropTypes.number,
}
