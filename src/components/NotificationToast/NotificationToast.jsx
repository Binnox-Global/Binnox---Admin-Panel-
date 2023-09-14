import React, { useContext } from 'react'
import { CToast, CToastBody, CToastClose, CToastHeader, CToaster } from '@coreui/react'
import { AdminContext } from 'src/context/adminContext'

function NotificationToast() {
  const { notificationToast } = useContext(AdminContext)
  return (
    <CToaster style={{ right: '0', position: 'fixed', top: '0', zIndex: '9999' }}>
      {notificationToast.length !== 0 && (
        <>
          {notificationToast.map((notification, i) => (
            <div key={i}>
              <CToast animation={false} autohide={false} visible={true}>
                <CToastHeader closeButton>
                  <div className="fw-bold me-auto">{notification?.header}</div>
                  <small>{notification?.time}</small>
                </CToastHeader>
                <CToastBody>{notification?.message}</CToastBody>
              </CToast>
            </div>
          ))}
        </>
      )}
    </CToaster>
  )
}

export default NotificationToast
