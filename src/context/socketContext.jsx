import axios from 'axios'
import React, { createContext, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'
import moment from 'moment'
import { AdminContext } from './adminContext'

export const SocketContext = createContext()

function SocketProvider({ children }) {
  const { token } = useContext(AdminContext)
  console.log('Socket Context', token)
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>
}

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
export default SocketProvider
