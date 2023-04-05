import React from 'react'

import {
  CAvatar,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'

function UserRecords() {
  const [userList, setUserList] = React.useState({
    loading: true,
    data: [],
  })
  const [cookies] = useCookies()
  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]
  let apiUrl = 'http://localhost:5000/api'
  async function getUserRecords() {
    // url: `${apiUrl}/auth/admin/login`,
    // axios POST request

    console.log(cookies.BinnoxAdmin.token)
    axios
      .get(`${apiUrl}/admin/customer`, {
        headers: {
          Authorization: cookies?.BinnoxAdmin?.token,
        },
      })
      .then((res) => {
        console.log(res.data)
        setUserList({
          loading: false,
          data: res.data.users,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  async function activeAccount(account_type, account_id) {
    // return
    // console.log(cookies?.BinnoxAdmin?.token)
    axios
      .put(
        `${apiUrl}/admin/activate?account_id=${account_id}&
account_type=${account_type}`,
        {},
        {
          headers: {
            Authorization: cookies?.BinnoxAdmin?.token,
          },
        },
      )
      .then((res) => {
        console.log(res.data)

        toast.success('Successfully')
        setUserList({
          loading: false,
          data: res.data.update,
        })
      })
      .catch((error) => {
        if (error.response.status || error.response.status === 400) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 401) {
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          return toast.error(error.response.data.message)
        }
        // toast.success('Successfully')
        console.error(error)
      })
  }

  React.useEffect(() => {
    getUserRecords()
  }, [])

  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader>Users</CCardHeader>
          <CCardBody>
            <CButtonGroup
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
            </CButtonGroup>
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
                {/* {tableExample.map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.user.name}</div>
                      <div className="small text-medium-emphasis">
                        <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                        {item.user.registered}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="clearfix">
                        <div className="float-start">
                          <strong>{item.usage.value}%</strong>
                        </div>
                        <div className="float-end">
                          <small className="text-medium-emphasis">{item.usage.period}</small>
                        </div>
                      </div>
                      <CProgress thin color={item.usage.color} value={item.usage.value} />
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CIcon size="xl" icon={item.payment.icon} />
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="small text-medium-emphasis">Last login</div>
                      <strong>{item.activity}</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CDropdown variant="btn-group">
                        <CDropdownToggle color="primary">Actions</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">Action</CDropdownItem>
                          <CDropdownItem href="#">Another action</CDropdownItem>
                          <CDropdownItem href="#">Something else here</CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem href="#">Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))} */}
                {userList.loading ? (
                  <>loading...</>
                ) : (
                  <>
                    {userList.data.map((item, index) => {
                      {
                        console.log(item.account_type, item._id)
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
                                      onClick={() => activeAccount(item.account_type, item._id)}
                                    >
                                      DeActivate {item.account_type}
                                    </CDropdownItem>
                                  ) : (
                                    <CDropdownItem
                                      onClick={() => activeAccount(item.account_type, item._id)}
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

export default UserRecords
