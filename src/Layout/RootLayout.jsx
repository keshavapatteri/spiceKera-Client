import React from 'react'
import AdminFooter from '../Components/Admin/AdminFooter'
import AdminHeader from '../Components/Admin/AdminHeader'
import { Outlet } from 'react-router-dom'



const RootLayout = () => {
  return (
    <div>
        <AdminHeader/>
        <div><Outlet/></div>
      <AdminFooter/>
    </div>
  )
}

export default RootLayout
