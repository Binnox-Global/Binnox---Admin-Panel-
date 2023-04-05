// import axios from 'axios'
import React, { createContext } from 'react'
import PropTypes from 'prop-types'
// import { useCookies } from 'react-cookie'
// import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'

export const AdminContext = createContext()

export function AdminProvider(props) {
  let text = '1234'
  return (
    <AdminContext.Provider
      value={{
        text,
      }}
    >
      {/* {props.children} */}
    </AdminContext.Provider>
  )
}
