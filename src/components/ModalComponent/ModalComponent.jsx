import { CButton, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AdminContext } from 'src/context/adminContext'

function ModalComponent({ component, title }) {
  const { modalComponentVisible, setModalComponentVisible } = React.useContext(AdminContext)
  return (
    <>
      <CButton className="btn-sm" onClick={() => setModalComponentVisible(true)}>
        {title}
      </CButton>
      <CModal
        fullscreen="xxl"
        visible={modalComponentVisible}
        onClose={() => setModalComponentVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{component}</CModalBody>
      </CModal>
    </>
  )
}

ModalComponent.propTypes = {
  component: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string,
  btnText: PropTypes.string,
}

export default ModalComponent
