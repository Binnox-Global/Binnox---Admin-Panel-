import React, { useEffect } from 'react'

import { CCol, CContainer, CLink, CRow, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilUser, cilLibraryBuilding, cilFastfood, cilNotes } from '@coreui/icons'

import { AdminContext } from 'src/context/adminContext'
import { Link } from 'react-router-dom'
import Orders, { NewOrdersGroupTransfer, NewOrdersTransfer, OldOrder } from '../orders/Orders'
import { ActiveBusinessRecords } from '../records/BusinessRecords'
import UserRecords from '../records/UserRecords'

const Dashboard = () => {
  const { userList, adminList, businessList, orderList, adminRecords, orderGroupList } =
    React.useContext(AdminContext)

  // useEffect(() => {
  //   console.log('businessList', businessList)
  //   console.log('orderGroupList', orderGroupList)
  // }, [orderGroupList])

  return (
    <>
      <CContainer>
        <CRow className="row-cols-md-2 row-cols-lg-3">
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/records/admins'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilLibraryBuilding} height={24} />}
              title=" Admin"
              value={adminList?.loading ? 'Loading...' : adminList?.data?.length}
            />
          </CCol>
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/records/businesses'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilLibraryBuilding} height={24} />}
              title=" Business"
              value={
                businessList?.loading
                  ? 'Loading...'
                  : `${businessList?.active?.length + businessList?.others?.length} / ${
                      businessList?.active?.length
                    } (Active)`
              }
            />
          </CCol>
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/records/users'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilUser} height={24} />}
              title="Customer"
              value={userList?.loading ? 'Loading...' : userList?.data?.length}
            />
          </CCol>
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/orders/new'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilFastfood} height={24} />}
              title="Orders"
              value={
                orderGroupList?.loading
                  ? 'Loading...'
                  : orderList?.data?.length + orderGroupList?.data?.length
              }
              // value={
              //   adminRecords?.loading ? 'Loading...' : orderList?.data?.length
              //   // + orderGroupList?.data?.length
              // }
              // value={600}
            />
          </CCol>
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/admin-records'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilNotes} height={24} />}
              title="Total"
              value={
                adminRecords?.loading
                  ? 'Loading...'
                  : ` ₦${adminRecords.totalTransactions?.toLocaleString()}`
              }
            />
          </CCol>
          <CCol>
            {' '}
            <CWidgetStatsF
              className="mb-3"
              color="warning"
              footer={
                <Link to={'/admin-records'}>
                  View more
                  <CIcon icon={cilArrowRight} className="float-end" width={16} />
                </Link>
              }
              icon={<CIcon icon={cilNotes} height={24} />}
              title="10 %"
              value={
                orderList?.loading
                  ? 'Loading...'
                  : ` ₦${adminRecords.transactions5percent?.toLocaleString()}`
              }
            />
          </CCol>
        </CRow>
      </CContainer>

      <Orders />
      <NewOrdersGroupTransfer />
      {/* <OldOrder /> */}
      <NewOrdersTransfer />
      <ActiveBusinessRecords show_max={5} />
      <UserRecords show_max={5} />
    </>
  )
}

export default Dashboard
