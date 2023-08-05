import React from 'react'

import { CCol, CContainer, CLink, CRow, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowRight, cilUser, cilLibraryBuilding, cilFastfood } from '@coreui/icons'

import { AdminContext } from 'src/context/adminContext'
import { Link } from 'react-router-dom'
import Orders from '../orders/Orders'
import { ActiveBusinessRecords } from '../records/BusinessRecords'
import UserRecords from '../records/UserRecords'

const Dashboard = () => {
  const { userList, adminList, businessList, orderList } = React.useContext(AdminContext)

  return (
    <>
      <CContainer>
        <CRow>
          <CCol sm="3">
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
          <CCol sm="3">
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
          <CCol sm="3">
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
              title="Customs"
              value={userList?.loading ? 'Loading...' : userList?.data?.length}
            />
          </CCol>
          <CCol sm="3">
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
              value={orderList?.loading ? 'Loading...' : orderList?.data?.length}
            />
          </CCol>
        </CRow>
      </CContainer>

      <Orders />
      <ActiveBusinessRecords show_max={5} />
      <UserRecords show_max={5} />
    </>
  )
}

export default Dashboard
