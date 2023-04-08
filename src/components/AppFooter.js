import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://binnox.app/" target="_blank" rel="noopener noreferrer">
          Binnox
        </a>
        <span className="ms-1">&copy; 2023 </span>
      </div>
      <div className="ms-auto">
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer"> */}
        Binnox Admin Dashboard
        {/* </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
