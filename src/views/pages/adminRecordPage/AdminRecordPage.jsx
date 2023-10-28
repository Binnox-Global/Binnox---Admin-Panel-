import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
// import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import LineChart from 'src/components/Chart/LineChat'
import { ChartTest } from 'src/components/Chart/ChartTest'
import { useCookies } from 'react-cookie'

function AdminRecordPage() {
  const { adminRecords } = useContext(AdminContext)
  const [adminAccess, setAdminAccess] = useState(false)

  function checkAdminAccess() {
    const userInput = window.prompt('Enter Admin Access Code')
    if (userInput !== null) {
      if (userInput.trim() === '') {
        return alert('Enter An Admin Access Code')
      }

      if (userInput !== 'victor') {
        return alert('Invalid Admin Access Code')
      }
      setAdminAccess(true)
    } else {
      setAdminAccess(false)
      alert('Enter Admin Access Code')
    }
  }
  return (
    <>
      {/* <LineChart /> */}
      <CCard className="mb-4">
        {' '}
        <CCardHeader>Transaction Chart</CCardHeader>
        <CCardBody>
          <ChartTest />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {' '}
            <CCardHeader>
              <div className="d-flex justify-content-between">
                Admin Record
                {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
                <button className="btn btn-primary btn-sm" onClick={() => checkAdminAccess()}>
                  Show Full Record
                </button>
              </div>
            </CCardHeader>
            <CCardBody>
              {adminRecords.loading ? (
                <>Loading...</>
              ) : (
                <div className="row">
                  <div className="col-md-6 my-2">
                    {/* {    totalTransactions: 0,
      transactions5percent: 0,
      totalDeliveryFee: 0,
      totalServiceFee: 0,
      groundTotal: 0,
      calculatedTransactions: 0,
      delivery10Percent: 0,
      calculatedDeliveryFee: 0,
      calculatedProfit: 0,} */}
                    <b>Total Service Fee</b> <br />₦{' '}
                    {adminRecords?.totalServiceFee?.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Delivery Fee</b> <br />₦{' '}
                    {adminRecords.calculatedDeliveryFee.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Transaction</b> <br />₦ {adminRecords?.totalTransactions?.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>5% of Transaction</b> <br />₦{' '}
                    {adminRecords.transactions5percent.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Ground Total</b> <br />₦ {adminRecords.groundTotal.toLocaleString()}
                  </div>
                  <div className="col-md-6 my-2">
                    <b>Profit</b> <br />₦ {adminRecords.calculatedProfit.toLocaleString()}
                  </div>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>{' '}
      {adminAccess && (
        <CRow>
          <CCol xs>
            <CCard className="mb-4">
              {' '}
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  Admin Record
                  {/* <ModalComponent title={'Update Rewords'} component={<RewordsForm />} /> */}
                  <button className="btn btn-sm btn-primary" onClick={() => setAdminAccess(false)}>
                    {' '}
                    Hide Full Record{' '}
                  </button>
                </div>
              </CCardHeader>
              <CCardBody>
                {adminRecords.loading ? (
                  <>Loading...</>
                ) : (
                  <div className="row">
                    <div className="col-md-6 my-2">
                      <b>Total Service Fee</b> <br />₦{' '}
                      {adminRecords.totalServiceFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Delivery Fee</b> <br />₦{' '}
                      {adminRecords.totalDeliveryFee.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Total Transaction</b> <br />₦{' '}
                      {adminRecords.totalTransactions.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>5% of Transaction</b> <br />₦{' '}
                      {adminRecords.transactions5percent.toLocaleString()}
                    </div>
                    <div className="col-md-6 my-2">
                      <b>Ground Total</b> <br />₦ {adminRecords.groundTotal.toLocaleString()}
                    </div>
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default AdminRecordPage

export function SubmitRecordPage() {
  const { referralOrderGrouping, setModalComponentVisible, apiUrl } = useContext(AdminContext)
  const [record, setRecord] = useState({
    todayOrderCount: 0,
    totalPrice: 0,
    totalServiceFee: 0,
    totalDelivery: 0,
  })
  const [cookies] = useCookies()
  useEffect(() => {
    // console.log(referralOrderGrouping)
    let total_service_fee = 0
    let total_delivery_fee = 0
    let sub_total_order_amount = 0
    referralOrderGrouping?.ordersMadeToday?.forEach((order) => {
      total_service_fee += order.service_fee
      total_delivery_fee += order.delivery_fee
      sub_total_order_amount += order.sub_total
    })

    setRecord({
      todayOrderCount: referralOrderGrouping?.ordersMadeToday.length,
      totalPrice: sub_total_order_amount,
      totalServiceFee: total_service_fee,
      totalDelivery: total_delivery_fee,
    })

    // console.log({ referralOrderGrouping })

    // console.log({
    //   order: referralOrderGrouping?.ordersMadeToday.length,
    //   total_service_fee,
    //   total_delivery_fee,
    //   sub_total_order_amount,
    // })
  }, [referralOrderGrouping])

  function closeDayRecordFunction() {
    if (!window.confirm('Are you sure you want to close record for today')) {
      return setModalComponentVisible(false)
    }
    // axios Get request
    const options = {
      url: `${apiUrl}/admin/end_the_day`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: cookies?.BinnoxAdmin?.token,
      },
    }
    // setLoading(false)
    // return console.log(data)

    axios(options)
      .then((response) => {
        console.log(response.data)
        toast.success('Record Saved')
        setModalComponentVisible(false)
      })
      .catch((error) => {
        // setLoading(false)
        // console.log(error)
        if (error.response.status || error.response.status === 400) {
          setModalComponentVisible(false)
          return toast.error(error.response.data.message)
        }
        if (error.response.status || error.response.status === 404) {
          setModalComponentVisible(false)
          return toast.error(error.response.data.message)
        }
        toast.error(error.message)
      })
  }
  return (
    <>
      <h3>Confirm Today Order Record</h3>

      <div className="row">
        <div className="col-md-6 mt-3">
          <b>Total Order</b> <br />
          {record.todayOrderCount}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Service Fee</b> <br />₦ {record.totalServiceFee.toLocaleString()}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Delivery fee</b> <br />₦ {record.totalDelivery.toLocaleString()}
        </div>
        <div className="col-md-6 mt-3">
          <b>Total Product Price</b> <br />₦ {record.totalPrice.toLocaleString()}
        </div>
      </div>

      <div className="mt-5">
        <button className="btn btn- btn-primary" onClick={() => closeDayRecordFunction()}>
          Close Record For today
        </button>
      </div>
    </>
  )
}
