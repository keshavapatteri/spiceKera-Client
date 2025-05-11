import React from 'react'
import Header from '../Components/Common/Header'

import { Footer } from '../Components/Common/Footer'
import { Outlet } from 'react-router-dom'

export const CommonLayout = () => {
  return (
    <div>
<Header/>
<div><Outlet/></div>
<Footer/>
    </div>
  )
}
