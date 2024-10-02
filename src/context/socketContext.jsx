import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
// import { UserContext } from './UserContext'
import { AdminContext } from './adminContext'

import io from 'socket.io-client'

export const SocketContext = createContext()

function SocketProvider({ children }) {
  const { token, setOrderList, setOrderGroupList, orderList } = useContext(AdminContext)
  const [testOrder, setTestOrder] = useState({
    loading: true,
    data: [],
  })
  const [playSoundNotification, setPlaySoundNotification] = useState(true)
  const [socket, setSocket] = useState(null)
  const [cookies, removeCookie] = useCookies()

  const [orderGroupTransferList, setOrderGroupTransferList] = React.useState({
    loading: true,
    data: {
      new: [],
      accepted: [],
      rejected: [],
    },
  })
  useEffect(() => {
    // console.log({ playSoundNotification })
    localStorage.getItem('binnox-admin-playSoundNotification')
      ? setPlaySoundNotification(
          JSON.parse(localStorage.getItem('binnox-admin-playSoundNotification')),
        )
      : setPlaySoundNotification(true)
  }, [])

  function toggleSoundFunction() {
    setPlaySoundNotification((prev) => !prev)
    localStorage.setItem(
      'binnox-admin-playSoundNotification',
      JSON.stringify(!playSoundNotification),
    )
  }

  const socketUrl = 'https://binnox-socket-c7299d8dfb25.herokuapp.com'
  // const socketUrl = 'http://localhost:1000'
  // useEffect(() => {
  //   // Trigger notification and ring sound
  //   triggerNotification()
  // }, [])
  const [isNotifying, setIsNotifying] = useState(false)

  const triggerNotification = ({ notificationHeader, notificationMessage }) => {
    console.log('triggerNotification called')
    if (isNotifying) return // Prevent duplicate notifications
    setIsNotifying(true)

    // Customize the notification sound if supported by the browser
    const audio = new Audio('/Binnox.webm') // Replace with your sound file
    // // console.log({ audio })
    // audio.addEventListener('error', (e) => {
    //   console.error('Error loading audio:', e)
    // })
    if (playSoundNotification) {
      console.log('Play sound is on', { playSoundNotification })
      // audio.muted = true // Mute the audio initially
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
      })
    } else {
      console.log('Play sound is off', { playSoundNotification })
      audio.pause()
    }
    setIsNotifying(false)

    if (permission === 'granted') {
      const notification = new Notification(notificationHeader || 'Test Notification', {
        body: notificationMessage || 'This is a Test Notification From Binnox',
        icon: '/icon.png',
        requireInteraction: true, // Add this option
      })

      notification.onshow = () => {
        console.log('Notification shown')
      }

      notification.onclick = () => {
        console.log('Notification clicked')
        // audio.muted = true // Mute the audio initially
        // Later, to stop the sound...
        audio.pause() // or audio.stop()
        // Handle click event
      }

      notification.onclose = () => {
        // audio.muted = true // Mute the audio initially
        // Later, to stop the sound...
        audio.pause() // or audio.stop()
        console.log('Notification closed')
      }

      setNotification(notification)
    } else {
      console.log('Permission denied')
    }

    // // Use the browser's Notification API to show a notification
    // if ('Notification' in window) {
    //   const notification = new Notification('New Order Received', {
    //     body: `Order ID: 123456993`,
    //   })
    //   notification.onclose = () => {
    //     setIsNotifying(false) // Reset the flag when the notification is closed
    //   }
    // }
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
  const [permission, setPermission] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    requestPermission()
  }, [])

  const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
      setPermission(permission)
    })
  }

  useEffect(() => {
    if (!socket) return
    socket.on('admin_orderWithTransfer', (data) => {
      // console.log('admin_orderWithTransfer', { pendingTransfer: data.pendingTransfer })
      // console.log('admin_orderWithTransfer', { pendingTransfer: data.pendingTransfer })

      // console.log('admin_orderWithTransfer populate state')
      // console.log('admin_orderWithTransfer populate state')
      setOrderGroupTransferList((prevOrderGroupTransferList) => ({
        ...prevOrderGroupTransferList,
        loading: false,
        data: {
          new: data.pendingTransfer,
          accepted: data.approvedTransfer,
          rejected: data.rejectedTransfer,
        },
      }))
      console.log('admin_orderWithTransfer populate state end')

      if (data.pendingTransfer?.length) {
        triggerNotification({
          notificationMessage: `They are (${data.pendingTransfer?.length}) unattended order with transfer`,
          notificationHeader: data.pendingTransfer?.length + ' Order With Transfer',
        })
      }
    })
    // socket to get orders
    socket.on('admin_orders', (data) => {
      // triggerNotification()
      // let pendingOrders = []
      // data.forEach((order) => {
      //   // console.log(order.statues)
      //   if (order.statues === 'Pending') {
      //     pendingOrders.push(order)
      //   }
      // })

      // if (pendingOrders?.length) {
      //   triggerNotification({
      //     notificationMessage: `They are (${pendingOrders?.length}) unattended order`,
      //     notificationHeader: pendingOrders?.length + ' Order Notification',
      //   })
      // }
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
        orderGroupTransferList,
        playSoundNotification,
        setPlaySoundNotification,
        toggleSoundFunction,
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
