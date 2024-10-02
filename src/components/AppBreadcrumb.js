import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { AdminContext } from 'src/context/adminContext'
import { SocketContext } from 'src/context/socketContext'
import './ToggleButton.scss'

const AppBreadcrumb = () => {
  const { refreshDashboardFunction } = useContext(AdminContext)
  const { playSoundNotification, toggleSoundFunction } = useContext(SocketContext)
  const currentLocation = useLocation().pathname
  // console.log('currentLocation', currentLocation)

  // const getRouteName = (pathname, routes) => {
  //   const currentRoute = routes.find((route) => route.path === pathname)
  //   console.log(currentRoute)
  //   return currentRoute ? currentRoute.name : false
  // }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = location.split('/').filter((str) => str !== '')

    // console.log()
    // location.split('/').reduce((prev, curr, index, array) => {
    //   console.log(prev, curr, index, array)
    //   const currentPathname = `${prev}/${curr}`
    //   const routeName = getRouteName(currentPathname, routes)
    //   routeName &&
    //     breadcrumbs.push({
    //       pathname: currentPathname,
    //       name: routeName,
    //       active: index + 1 === array.length ? true : false,
    //     })
    //   return currentPathname
    // })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <>
      {' '}
      <CBreadcrumb className="m-0 ms-2">
        {/* <CBreadcrumbItem href="/dashboard">Dashboard</CBreadcrumbItem> */}
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              className="text-capitalize"
              key={index}
              // {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            >
              {breadcrumb}
            </CBreadcrumbItem>
            // <CBreadcrumbItem
            //   {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            //   key={index}
            // >
            //   {breadcrumb.name}
            // </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>
      {/* <button className=" btn btn-primary" onClick={() => refreshDashboardFunction()}>
        ReLoad

      </button> */}
      <div>
        <div>{playSoundNotification ? 'Off' : 'On'} Sound</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={playSoundNotification ? true : false}
            onChange={(e) => {
              toggleSoundFunction()
              // console.log(e)
            }}
          />
          <span className="slider round"></span>
        </label>
        {/* /* From Uiverse.io by Javierrocadev * /
        <div className="checkbox-wrapper-35">
          <input
            value="private"
            name="switch"
            id="switch"
            type="checkbox"
            className="switch"
            onChange={(e) => {
              setPlaySoundNotification((prev) => !prev)
              console.log({ switch: e.target })
            }}
          />
          <label htmlFor="switch">
            <span className="switch-x-text">This is </span>
            <span className="switch-x-toggletext">
              <span className="switch-x-unchecked">
                <span className="switch-x-hiddenlabel">Unchecked: </span>Off
              </span>
              <span className="switch-x-checked">
                <span className="switch-x-hiddenlabel">Checked: </span>On
              </span>
            </span>
          </label>
        </div> */}
      </div>
    </>
  )
}

export default React.memo(AppBreadcrumb)
