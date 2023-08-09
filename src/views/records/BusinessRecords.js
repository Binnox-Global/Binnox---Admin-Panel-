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
              ) : null}
            </div>
          </CCardHeader>
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
                  <CTableHeaderCell className="text-center">#</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilPeople} />
                  </CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Contact</CTableHeaderCell>
                  {/* <CTableHeaderCell>Verification Docs</CTableHeaderCell> */}
                  <CTableHeaderCell>Location</CTableHeaderCell>
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Wallet</CTableHeaderCell>
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
                    {businessList?.active?.map((item, index) => {
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
                          {/* <BusinessLocation
                            longitude={item?.business_location?.long}
                            latitude={item?.business_location?.lat}
                          /> */}
                          <>
                            {item?.business_location?.lat &&
                            item?.business_location?.long &&
                            item?.business_location?.lat !== '' &&
                            item?.business_location?.long !== '' ? (
                              <BusinessLocation
                                longitude={item?.business_location?.long}
                                latitude={item?.business_location?.lat}
                              />
                            ) : (
                              <CTableDataCell className="text-center">--</CTableDataCell>
                            )}
                          </>

                          <CTableDataCell className="">
                            <div>
                              ₦
                              {item?.wallet?.balance !== null && item?.wallet?.balance !== undefined
                                ? item?.wallet?.balance.toLocaleString()
                                : '--'}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item?.business_verified ? 'Verified' : '--'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                            <div>{moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}</div>
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

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader className="d-flex">Other Businesses </CCardHeader>
          <CCardBody>
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
                  <CTableHeaderCell>Address</CTableHeaderCell>
                  <CTableHeaderCell>Wallet</CTableHeaderCell>
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
                    {businessList?.others?.map((item, index) => {
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
                          <>
                            {item?.business_location?.lat &&
                            item?.business_location?.long &&
                            item?.business_location?.lat !== '' &&
                            item?.business_location?.long !== '' ? (
                              <BusinessLocation
                                longitude={item?.business_location?.long}
                                latitude={item?.business_location?.lat}
                              />
                            ) : (
                              <CTableDataCell className="text-center">--</CTableDataCell>
                            )}
                          </>
                          <CTableDataCell className="">
                            <div>
                              ₦
                              {item?.wallet?.balance !== null && item?.wallet?.balance !== undefined
                                ? item?.wallet?.balance.toLocaleString()
                                : '--'}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item?.business_active ? 'Active' : 'Deactivated'}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div>{item?.business_verified ? 'Verified' : '--'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <div>{moment(item?.createdAt).format('ddd, MMM, yyy')}</div> */}
                            <div>{moment(item?.createdAt).format('ddd, MMM Do YYYY h:mm a')}</div>
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

function BusinessLocation({ latitude, longitude }) {
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
      {addressLoading ? 'Loading...' : address?.suburb}
    </CTableDataCell>
  )
}

BusinessLocation.propTypes = {
  latitude: PropTypes.number,

  longitude: PropTypes.number,
}
