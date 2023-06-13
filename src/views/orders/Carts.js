import React from 'react'
import { useEffect, useState } from 'react'
import './Orders.scss'

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
import { AdminContext } from 'src/context/adminContext'
import PropTypes from 'prop-types'

function CartsRecord() {
  const { getCartRecordsFunction, cartList } = React.useContext(AdminContext)
  const [newOrders, setNewOrders] = useState([])

  useEffect(() => {
    getCartRecordsFunction()
  }, [])

  useEffect(() => {
    console.log(cartList)
    console.log('groupedCarts', groupedCarts)
  }, [cartList])

  const groupedCarts = cartList?.data?.reduce((result, cart) => {
    // console.log('orderList', newOrders)

    const userId = cart.user._id
    const userCarts = result.find((group) => group[0].user._id === userId)

    if (userCarts) {
      userCarts.push(cart)
    } else {
      result.push([cart])
    }

    return result
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>User Cart</CCardHeader>
          <CCardBody>
            {cartList.loading ? (
              <>loading...</>
            ) : (
              <>
                {groupedCarts.map((carts, i) => {
                  return <CartGroupCard key={i} carts={carts} />
                })}
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CartsRecord

function CartGroupCard({ carts }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const { decodeDate } = React.useContext(AdminContext)
  return (
    <div className="OrderGroupCard">
      {/* OrderGroupCard */}
      <div className="head" onClick={() => setShowDropDown(!showDropDown)}>
        <div className="d-flex gap-3">
          <CAvatar
            size="md"
            // src={item?.user?.user_avatar}
            src="https://via.placeholder.com/600x400?text=Image"
            status={'success'}
          />
          <div className="user-name">
            {carts[0].user.full_name}
            <br />
            <b>Email:</b> {carts[0]?.user?.email} || <b>Contact:</b> {carts[0]?.user?.phone_number}
          </div>
        </div>
        <div className="user-name">
          <b>Total:</b> ₦ {carts[0].total_amount}
        </div>
      </div>
      <div
        className="dropdown"
        style={
          showDropDown
            ? { display: 'inline-flex' }
            : {
                display: 'none',
              }
        }
      >
        <CTable
          align="middle"
          className="mb-0 border"
          hover
          responsive
          style={{ overflow: 'visible' }}
        >
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Product</CTableHeaderCell>
              <CTableHeaderCell>Count</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
              <CTableHeaderCell>Product Available</CTableHeaderCell>
              <CTableHeaderCell>Product Solid Count</CTableHeaderCell>
              <CTableHeaderCell>Time</CTableHeaderCell>
              {/* <CTableHeaderCell>Rider</CTableHeaderCell>
              <CTableHeaderCell>30 minutes Delay CountDown</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {carts.map((item, index) => {
              // if (item.statues === 'Pending' || item.statues === 'Processing') {
              return (
                <CTableRow v-for="item in tableItems" className="text-center" key={index}>
                  <CTableDataCell>
                    <div>{item?.product?.name}</div>
                    <div className="small text-medium-emphasis">
                      Business: {item?.business?.business_name}
                    </div>
                  </CTableDataCell>
                  {/* <CTableDataCell className="text-center">
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
                    </CTableDataCell> */}
                  <CTableDataCell>
                    <div>{item?.item_count}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>₦ {item?.product?.prices & 0}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item?.product?.available_count}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item?.product?.sold_count}</div>
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <div>{item?.delivered ? 'Delivered' : 'Not delivered'}</div>
                  </CTableDataCell> */}
                  <CTableDataCell>
                    <div>{decodeDate(item?.updatedAt)[1]}</div>
                    <div className="small text-medium-emphasis">
                      Date: {decodeDate(item?.updatedAt)[0]}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
              // }
            })}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
}

CartGroupCard.propTypes = {
  carts: PropTypes.array,
}
