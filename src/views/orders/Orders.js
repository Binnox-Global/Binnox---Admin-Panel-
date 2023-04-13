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
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

function Orders() {
  const { orderList, updateOrderStatusFunction } = React.useContext(AdminContext)

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
                  <CTableHeaderCell>User</CTableHeaderCell>
                  <CTableHeaderCell>Product</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">BusinessLocation</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Customer Location</CTableHeaderCell>
                  <CTableHeaderCell>Count</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
                  <CTableHeaderCell>Statues</CTableHeaderCell>
                  <CTableHeaderCell>Rider</CTableHeaderCell>
                  <CTableHeaderCell>User</CTableHeaderCell>
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
                            <div>{item?.user?.full_name}</div>
                            <div className="small text-medium-emphasis">
                              Email: {item?.user?.email} || Contact: {item?.user?.phone_number}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.product?.name}</div>
                            <div className="small text-medium-emphasis">
                              Business: {item?.business?.business_name}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {item?.business?.business_location?.lat &&
                            item?.business?.business_location?.long &&
                            item?.business?.business_location?.lat !== '' &&
                            item?.business?.business_location?.long !== '' ? (
                              <LocationDropdown
                                location={`https://www.google.com/maps/search/?api=1&query=${item?.business?.business_location?.lat},${item?.business?.business_location?.long}`}
                              />
                            ) : (
                              'Location not valid'
                            )}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {/* <CIcon size="xl" icon={item?.address} title={item?.country?.name} /> */}
                            {item?.address.split(',')[0] &&
                            item?.address.split(',')[1] &&
                            item?.address.split(',')[0] !== '' &&
                            item?.address.split(',')[1] !== '' ? (
                              <LocationDropdown
                                location={`https://www.google.com/maps/search/?api=1&query=${
                                  item?.address.split(',')[0]
                                },${item?.address.split(',')[1]}`}
                              />
                            ) : (
                              'Location not valid'
                            )}
                            {/* {console.log(item?.address.split(''))} */}
                            <div></div>
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
                            {/* <div className="small text-medium-emphasis">Last login</div> */}
                            <div>{item?.delivered ? 'Delivered' : 'Not delivered'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            {/* <div className="small text-medium-emphasis">Last login</div> */}
                            <div>{item?.received ? 'Received' : 'Not received'}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <CDropdown variant="btn-group">
                              <CDropdownToggle color="primary">Actions</CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem
                                  onClick={() => updateOrderStatusFunction(item?._id, 'Pending')}
                                >
                                  Pending
                                </CDropdownItem>
                                <CDropdownItem
                                  onClick={() => updateOrderStatusFunction(item?._id, 'Picked up')}
                                >
                                  Picked up
                                </CDropdownItem>
                                <CDropdownItem
                                  onClick={() => updateOrderStatusFunction(item?._id, 'Delivered')}
                                >
                                  Delivered
                                </CDropdownItem>
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

export function LocationDropdown({ location }) {
  async function copyLocation(link) {
    // return console.log(link)
    try {
      await navigator.clipboard.writeText(link)
      toast.info('Link Copied')
    } catch {
      toast.error('Error copying link')
    }
  }
  function openMapLocation(link) {
    window.open(link)
  }
  return (
    <CDropdown variant="btn-group">
      <CDropdownToggle color="">Location</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem onClick={() => openMapLocation(location)}>Open Map</CDropdownItem>
        <CDropdownItem onClick={() => copyLocation(location)}>Copy Link</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

LocationDropdown.propTypes = {
  location: PropTypes.string,
}
