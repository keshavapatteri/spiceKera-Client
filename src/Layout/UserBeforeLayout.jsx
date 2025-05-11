import React from 'react'
import { UserBeforeHeader } from '../Components/UserBeforeHeader'
import { Outlet } from 'react-router-dom'
import { UserFooter } from '../Components/User/UserFooter'

export const UserBeforeLayout = () => {
  return (
    <div>

        <UserBeforeHeader/>
            <div><Outlet/></div>
        <UserFooter/>
    </div>
  )
}
