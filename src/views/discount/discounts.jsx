import React from 'react'
import { AdminContext } from 'src/context/adminContext'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTableHead,
  CTableHeaderCell,
  CFormSwitch,
  CTableRow,
} from '@coreui/react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
import CreateDiscountCodePage from './CreateDiscountCodePage'

function Discounts() {
  const {
    getDiscountCodeFunction,
    discountList,
    decodeDate,
    updateDiscountStateFunction,
    deleteDiscountCodeFunction,
  } = React.useContext(AdminContext)
  // console.log(discountList)
  React.useEffect(() => {
    getDiscountCodeFunction()
  }, [])
  return (
    <>
      {' '}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                Active Discount Code List
                <ModalComponent
                  title={'Create Discount Code'}
                  component={<CreateDiscountCodePage />}
                />
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable
                align="middle"
                className="mb-0 border"
                hover
                responsive
                style={{ overflow: 'visible' }}
              >
                <CTableHead color="light">
                  <CTableRow className="text-center">
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Discount</CTableHeaderCell>
                    <CTableHeaderCell>Max Valid</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Used</CTableHeaderCell>
                    <CTableHeaderCell>Created</CTableHeaderCell>
                    <CTableHeaderCell>updated</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {discountList.loading ? (
                    <>loading...</>
                  ) : (
                    <>
                      {/* {console.log('discountList', discountList?.data?.activeDiscountList)} */}
                      {discountList?.data?.activeDiscountList?.map((item, index) => {
                        // if (item.statues === 'Picked up') {
                        return (
                          <CTableRow v-for="item in tableItems" className="text-center" key={index}>
                            <CTableDataCell className="text-center">
                              <div>{item?.code}</div>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>{item?.discount}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{item?.max_valid_count}</div>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div>{item?.valid_count}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-c enter">
                              <div>{decodeDate(item?.createdAt)[0]}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>{decodeDate(item?.updatedAt)[0]}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div>
                                <CDropdown variant="btn-group">
                                  <CDropdownToggle color="primary">Actions</CDropdownToggle>
                                  <CDropdownMenu>
                                    {item?.active ? (
                                      <CDropdownItem
                                        onClick={() =>
                                          updateDiscountStateFunction(item?._id, item?.active)
                                        }
                                      >
                                        Deactivate
                                      </CDropdownItem>
                                    ) : (
                                      <CDropdownItem
                                        onClick={() =>
                                          updateDiscountStateFunction(item?._id, item?.active)
                                        }
                                      >
                                        Activate
                                      </CDropdownItem>
                                    )}
                                    <CDropdownItem onClick={() => deleteDiscountCodeFunction(item)}>
                                      Delete
                                    </CDropdownItem>
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        )
                        // }
                      })}
                    </>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <DeActiveDiscountCodeList />
    </>
  )
}

export default Discounts
export function DeActiveDiscountCodeList() {
  const {
    getDiscountCodeFunction,
    discountList,
    decodeDate,
    updateDiscountStateFunction,
    deleteDiscountCodeFunction,
  } = React.useContext(AdminContext)
  // console.log(discountList)
  // React.useEffect(() => {
  //   // getDiscountCodeFunction()
  // }, [])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>DeActive Discount Code List</CCardHeader>
          <CCardBody>
            <CTable
              align="middle"
              className="mb-0 border"
              hover
              responsive
              style={{ overflow: 'visible' }}
            >
              <CTableHead color="light">
                <CTableRow className="text-center">
                  <CTableHeaderCell>Code</CTableHeaderCell>
                  <CTableHeaderCell>Discount</CTableHeaderCell>
                  <CTableHeaderCell>Max Valid</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Used</CTableHeaderCell>
                  <CTableHeaderCell>Created</CTableHeaderCell>
                  <CTableHeaderCell>updated</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {discountList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {discountList?.data?.deActivatedDiscountList?.map((item, index) => {
                      // if (item.statues === 'Picked up') {
                      return (
                        <CTableRow v-for="item in tableItems" className="text-center" key={index}>
                          <CTableDataCell className="text-center">
                            <div>{item?.code}</div>
                          </CTableDataCell>

                          <CTableDataCell>
                            <div>{item?.discount}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item?.max_valid_count}</div>
                          </CTableDataCell>

                          <CTableDataCell>
                            <div>{item?.valid_count}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-c enter">
                            <div>{decodeDate(item?.createdAt)[0]}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{decodeDate(item?.updatedAt)[0]}</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>
                              <CDropdown variant="btn-group">
                                <CDropdownToggle color="primary">Actions</CDropdownToggle>
                                <CDropdownMenu>
                                  {item?.active ? (
                                    <CDropdownItem
                                      onClick={() =>
                                        updateDiscountStateFunction(item?._id, item?.active)
                                      }
                                    >
                                      Deactivate
                                    </CDropdownItem>
                                  ) : (
                                    <CDropdownItem
                                      onClick={() =>
                                        updateDiscountStateFunction(item?._id, item?.active)
                                      }
                                    >
                                      Activate
                                    </CDropdownItem>
                                  )}
                                  <CDropdownItem onClick={() => deleteDiscountCodeFunction(item)}>
                                    Delete
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      )
                      // }
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
