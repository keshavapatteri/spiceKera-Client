import React from 'react'
import { Outlet } from 'react-router-dom'
import { ResturantHeader } from '../Components/Resturant/ResturantHeader'
import { ResturantFooter } from '../Components/Resturant/ResturantFooter'

export const ResturantLayout = () => {
  return (
    <div>
    <ResturantHeader/>
     <div><Outlet/></div>
     <ResturantFooter/>
     </div>
  )
}
