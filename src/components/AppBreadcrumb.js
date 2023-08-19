import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import Buttons from './../views/buttons/buttons/Buttons'
import { AdminContext } from 'src/context/adminContext'

const AppBreadcrumb = () => {
  const { refreshDashboardFunction } = useContext(AdminContext)
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
      <button className=" btn btn-primary" onClick={() => refreshDashboardFunction()}>
        ReLoad
      </button>
    </>
  )
}

export default React.memo(AppBreadcrumb)
