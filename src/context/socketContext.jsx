import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
// import { UserContext } from './UserContext'
import moment from 'moment'
import { AdminContext } from './adminContext'

import io from 'socket.io-client'

export const SocketContext = createContext()

function SocketProvider({ children }) {
  const { token, setOrderList, orderList, setOrderGroupTransferList } = useContext(AdminContext)
  const [testOrder, setTestOrder] = useState({
    loading: true,
    data: [],
  })
  const [socket, setSocket] = useState(null)
  const [cookies, removeCookie] = useCookies()

  useEffect(
    function () {
      if (!token) return
      // const socket = io('http://localhost:1000', {
      //   query: {
      //     token: token, // Include your JWT token here
      //   },
      // }) // Replace with your server URL
      // Connect to the Socket.IO server
      const socket = io('https://binnox-socket-c7299d8dfb25.herokuapp.com', {
        query: {
          token: cookies?.BinnoxAdmin.token, // Include your JWT token here
        },
      }) // Replace with your server URL

      setSocket(socket)
      //
      // Event handler for 'connect' event
      socket.on('connect', () => {
        console.log('Connected to server')
      })

      // Event handler for 'disconnect' event
      socket.on('disconnect', () => {
        console.log('Disconnected from server')
      })

      // Clean up the connection on unmount
      return () => {
        socket.disconnect()
        setSocket(null)
      }
    },
    [token],
  )

  useEffect(
    function () {
      // Connect to the Socket.IO server
      if (!socket) return

      // Event handler for 'message' event
      socket.on('admin_getOrder', (data) => {
        console.log('Received data:', data)
        // setTestOrder({ loading: false, data })
        setOrderList({ loading: false, data: data.reverse() })
      })

      // socket.on('admin_orderWithTransfer', (data) => {
      //   setOrderGroupTransferList({
      //     loading: false,
      //     data: {
      //       new: [],
      //       accepted: [],
      //       rejected: [],
      //     },
      //   })
      //   setOrderGroupTransferList((prevOrderGroupTransferList) => ({
      //     ...prevOrderGroupTransferList,
      //     loading: false,
      //     data: {
      //       new: data.pendingTransfer.reverse(),
      //       accepted: data.approvedTransfer.reverse(),
      //       rejected: data.rejectedTransfer.reverse(),
      //     },
      //   }))
      //   console.log('admin_orderWithTransfer', data)
      // })

      // Event handler for 'message' event
      socket.on('Error', (data) => {
        // setError(data)
        console.log('Error', data)
      })

      adminGetOrderTransfersSocketFunction()
    },
    [socket],
  )

  useEffect(() => {
    if (!socket) return
    socket.on('admin_orderWithTransfer', (data) => {
      console.log('admin_orderWithTransfer', data)
      adminGetOrderTransfersSocketFunction()
      setOrderGroupTransferList((prevOrderGroupTransferList) => ({
        ...prevOrderGroupTransferList,
        loading: false,
        data: {
          new: data.pendingTransfer.reverse(),
          accepted: data.approvedTransfer.reverse(),
          rejected: data.rejectedTransfer.reverse(),
        },
      }))
    })

    // Clean up the event listener
    return () => {
      socket.off('admin_orderWithTransfer')
    }
  }, [socket]) // Empty dependency array ensures that this effect runs only once

  function adminGetOrderTransfersSocketFunction() {
    console.log('adminGetOrderTransfersSocketFunction called')
    // Event handler for 'message' event
    socket.emit('admin_getOrderWithTransfer', {}, (callback) => {
      console.log('Received data:', { data: callback })
      // setOrderList({ loading: false, data: callback.data?.reverse() })
      setOrderGroupTransferList((prevOrderGroupTransferList) => ({
        ...prevOrderGroupTransferList,
        loading: false,
        data: {
          new: callback.pendingTransfer.reverse(),
          accepted: callback.approvedTransfer.reverse(),
          rejected: callback.rejectedTransfer.reverse(),
        },
      }))
    })
  }

  function adminGetOrdersSocketFunction() {
    // console.log('adminGetOrdersSocketFunction called')

    if (!socket) return
    // Event handler for 'message' event
    socket.emit('admin_getPendingOrders', {}, (callback) => {
      // console.log('Received data:', { data: callback.data })
      setOrderList({ loading: false, data: callback.data?.reverse() })
    })
  }
  return (
    <SocketContext.Provider
      value={{
        socket,
        adminGetOrdersSocketFunction,
        adminGetOrderTransfersSocketFunction,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
export default SocketProvider
