import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useContext } from 'react'
import ModalComponent from 'src/components/ModalComponent/ModalComponent'
import RewordsForm from './RewordsForm'
import { AdminContext } from 'src/context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function RewordPage() {
  const { rewords, apiUrl, token, setRewords } = useContext(AdminContext)

  function createRewordDocumentFunction() {
    axios
      .post(
        `${apiUrl}/admin/rewords`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        setRewords({ loading: false, data: res.data.rewordDocument })
        toast.success('Rewords Document Created Successfully')
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message)
          setRewords({ loading: false, data: error.response.data.reword })
          return
        }
        console.log(error)
      })
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {' '}
            <CCardHeader>
              <div className="d-flex justify-content-between">
                Rewords
                <ModalComponent title={'Update Rewords'} component={<RewordsForm />} />
              </div>
            </CCardHeader>
            <CCardBody>
              {rewords.loading ? (
                <>Loading...</>
              ) : (
                <>
                  {rewords?.data === null ? (
                    <div className="text-center">
                      <h2>No Reword Document Created</h2>
                      <button
                        className="btn btn-primary btn-sm mt-2"
                        onClick={() => createRewordDocumentFunction()}
                      >
                        Create Document
                      </button>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-6 my-2">
                        <b>User Referral User Reword</b> <br />
                        {rewords?.data?.user_refer_user_reword} point
                      </div>
                      <div className="col-md-6 my-2">
                        <b>Ambassador Referral User Reword</b> <br />
                        {rewords?.data?.ambassador_refer_user_reword} point
                      </div>
                      <div className="col-md-6 my-2">
                        <b>Ambassador Referral Ambassador Reword</b> <br />
                        {rewords?.data?.ambassador_refer_ambassador_reword} point
                      </div>
                      <div className="col-md-6 my-2">
                        <b>Ambassador Referral Order Reword</b> <br />
                        {rewords?.data?.ambassador_down_line_order_reword}%
                      </div>
                      <div className="col-md-6 my-2">
                        <b>User Order Reword</b> <br />
                        {rewords?.data?.user_order_reword}%
                      </div>
                    </div>
                  )}
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            {' '}
            <CCardHeader>Rewords History</CCardHeader>
            <CCardBody>
              {rewords.loading ? (
                <>Loading...</>
              ) : (
                <>
                  {rewords?.data === null ? (
                    <>No Reword Document Created</>
                  ) : (
                    <>
                      {rewords?.data?.reword_history.length === 0 ? (
                        <>No History</>
                      ) : (
                        <>
                          {/* {rewords?.data?.reword_history?.map((item, i) => ( */}
                          {rewords?.data?.reword_history?.reverse()?.map((item, i) => (
                            <div key={i} className="card p-2 my-1">
                              {item?.user_refer_user_reword ? (
                                <div className="d-flex gap-2">
                                  <b>User Referral User Reword</b> {item?.user_refer_user_reword}
                                </div>
                              ) : null}
                              {item?.ambassador_refer_user_reword ? (
                                <div className="d-flex gap-2">
                                  <b>Ambassador Referral User Reword</b>{' '}
                                  {item?.ambassador_refer_user_reword}
                                </div>
                              ) : null}
                              {item?.ambassador_refer_ambassador_reword ? (
                                <div className="d-flex gap-2">
                                  {' '}
                                  <b>Ambassador Referral Ambassador Reword</b>{' '}
                                  {item?.ambassador_refer_ambassador_reword}
                                </div>
                              ) : null}
                              {item?.ambassador_down_line_order_reword ? (
                                <div className="d-flex gap-2">
                                  {' '}
                                  <b>Ambassador Referral Order Reword</b>{' '}
                                  {item?.ambassador_down_line_order_reword}
                                </div>
                              ) : null}
                              {item?.user_order_reword ? (
                                <div className="d-flex gap-2">
                                  {' '}
                                  <b>User Order Reword</b> {item?.user_order_reword}
                                </div>
                              ) : null}
                              <div className="d-flex gap-2 my-1">
                                <b>Updated on</b> {item?.updatedAtDate}, {item?.updatedAtTime}
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default RewordPage
