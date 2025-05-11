import React from 'react'
import { UserHeader } from '../Components/User/UserHeader'
import { UserFooter } from '../Components/User/UserFooter'
import { Outlet } from 'react-router-dom'


export const UserLayout = () => {
  return (
<div>
<UserHeader/>
    <div><Outlet/></div>
<UserFooter/>

</div>
  )
}
