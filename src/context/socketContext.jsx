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
  const { token, setOrderList, setOrderGroupList, orderList, setOrderGroupTransferList } =
    useContext(AdminContext)
  const [testOrder, setTestOrder] = useState({
    loading: true,
    data: [],
  })
  const [socket, setSocket] = useState(null)
  const [cookies, removeCookie] = useCookies()

  // const socketUrl = 'https://binnox-socket-c7299d8dfb25.herokuapp.com'
  const socketUrl = 'http://localhost:1000'
  // useEffect(() => {
  //   // Trigger notification and ring sound
  //   triggerNotification()
  // }, [])
  const [isNotifying, setIsNotifying] = useState(false)

  const triggerNotification = (order) => {
    if (isNotifying) return // Prevent duplicate notifications
    setIsNotifying(true)

    // Customize the notification sound if supported by the browser
    const audio = new Audio('/Binnox.webm') // Replace with your sound file
    // console.log({ audio })
    audio.addEventListener('error', (e) => {
      console.error('Error loading audio:', e)
    })

    // audio.muted = true // Mute the audio initially
    audio.play().catch((error) => {
      console.error('Error playing audio:', error)
    })

    // Use the browser's Notification API to show a notification
    if ('Notification' in window) {
      const notification = new Notification('New Order Received', {
        body: `Order ID: 123456993`,
      })
      notification.onclose = () => {
        setIsNotifying(false) // Reset the flag when the notification is closed
      }
    }
  }

  useEffect(
    function () {
      if (!token) return
      const socket = io(socketUrl, {
        query: {
          token: token, // Include your JWT token here
        },
      }) // Replace with your server URL

      // Event handler for 'connect' event
      socket.on('connect', () => {
        console.log('Connected to server')
        setSocket((prev) => socket)
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

  useEffect(() => {
    if (!socket) return
    socket.on('admin_orderWithTransfer', (data) => {
      // console.log('admin_orderWithTransfer', data)
      triggerNotification()
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
    // socket to get orders
    socket.on('admin_orders', (data) => {
      triggerNotification()
      // console.log('admin_orders', data)
      setOrderGroupList((prevOrderGroupList) => ({
        ...prevOrderGroupList,
        loading: false,
        data: data,
      }))
    })

    // Clean up the event listener
    return () => {
      socket.off('admin_orderWithTransfer')
      socket.off('admin_orders')
    }
  }, [socket]) // Empty dependency array ensures that this effect runs only once

  return (
    <SocketContext.Provider
      value={{
        socket,
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
