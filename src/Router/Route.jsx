import React from 'react'

import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../Layout/RootLayout'



import { CommonLayout } from '../Layout/CommonLayout'
import { CommonLogin } from '../Pages/CommonLogin'
import { UserHomePage } from '../Pages/UserHomePage'
import { UserLayout } from '../Layout/UserLayout'
import { AboutPage } from '../Pages/User/AboutPage'
import { IteamPage } from '../Pages/User/IteamPage'
import { Privacy } from '../Components/User/Privacy'
import { Terms } from '../Components/User/Terms'
import { Contact } from '../Components/User/Contact'
import { AllProductsCards } from '../Components/User/AllProductsCards'
import { AllProducts } from '../Pages/User/AllProducts'
import { ResturantLogin } from '../Pages/Resturant/ResturantLogin'
import { ProfilePage } from '../Pages/User/ProfilePage'
import { CartPage } from '../Pages/User/CartPage'
import { AddressPage } from '../Pages/User/AddressPage'
import { PaymentSuccessPage } from '../Pages/User/PaymentSuccessPage'
import { AllOrders } from '../Pages/User/AllOrders'
import { Resturantdashboard } from '../Pages/Resturant/Resturantdashboard'
import { ResturantAddProduct } from '../Pages/Resturant/ResturantAddProduct'
import { ResturantByGetAllProduct } from '../Pages/Resturant/ResturantByGetAllProduct'
import ResturantGetById from '../Pages/Resturant/ResturantGetById'
import ResturantProductEditById from '../Pages/Resturant/ResturantProductEditById'
import { ResturantLayout } from '../Layout/ResturantLayout'
import { ResturantProfile } from '../Pages/Resturant/ResturantProfile'
import { ResturantByOrders } from '../Pages/Resturant/ResturantByOrders'
import { AdminLogin } from '../Pages/Admin/AdminLogin'
import { Admindashboard } from '../Pages/Admin/Admindashboard'
import { AdminGetAllUser } from '../Pages/Admin/AdminGetAllUser'
import { AdminGetallRestaurant } from '../Pages/Admin/AdminGetallRestaurant'
import { AdminRestaurantGetById } from '../Pages/Admin/AdminRestaurantGetById'
import { AdminAllProducts } from '../Pages/Admin/AdminAllProducts'
import { AdminProductGetById } from '../Pages/Admin/AdminProductGetById'
import { AdminGetAllReview } from '../Pages/Admin/AdminGetAllReview'
import { AdminProductcategories } from '../Pages/Admin/AdminProductcategories'
import { AdminGetallCategory } from '../Pages/Admin/AdminGetallCategory'
import ProductListByCategory from '../Components/User/ProductListByCategory'
import { UserAuth } from './Auth/UserAuth'
import { AdminAuth } from './Auth/AdminAuth'
import { RestAuth } from './Auth/RestAuth'
import { PaymentFailed } from '../Pages/User/PaymentFailed'
import { UserBeforeLayout } from '../Layout/UserBeforeLayout'



export const router=createBrowserRouter([


    {
        path: "/",
        // element:<RootLayout/>,
        children:[
            {
                path: "Admin",
                element: <AdminLogin/>
            },


        ]},


    {
        path: "/",
        element:<AdminAuth><RootLayout/></AdminAuth>,
        children:[
           
            {
                path: "admindashboard",
                element: <Admindashboard/>
            },
            {
                path: "/getalluser",
                element: <AdminGetAllUser/>
            },
            {
                path: "/allRestaurant",
                element: <AdminGetallRestaurant/>
            },
            {
                path: "/byIdRestaurant/:id",
                element: <AdminRestaurantGetById/>
            },
            {
                path: "/allProducts",
                element: <AdminAllProducts/>
            },
            {
                path: "/byIdproduct/:id",
                element: <AdminProductGetById/>
            },
            {
                path: "/allReview",
                element: <AdminGetAllReview/>
            },
            {
                path: "categories",
                element: <AdminProductcategories/>
            },
            {
                path: "GetallCategory",
                element: <AdminGetallCategory/>
            },
      
]},
{
    path: "/",
    element:<CommonLayout/>,
    children:[
       
        {
            path: "login",
            element: <CommonLogin/>
        },
      
        {
            path: "ResturantLogin",
            element: <ResturantLogin/>
        },


]},

//auth User
{
    path: "/",
    
    element:<UserAuth><UserLayout/></UserAuth>,
    children:[
        {
            path: "homePage",
            element: <UserHomePage/>
        },
        {
            path: "Cartpageeee",
            element: <CartPage/>
        },
        {
            path: "profile",
            element: <ProfilePage/>
        },
       
        {
            path: "Address/:id",
            element: <AddressPage/>
        },
        {
            path: "PaymentSuccess",
            element: <PaymentSuccessPage/>
        },
        {
            path: "PaymentFailed",
            element: <PaymentFailed/>
        },
        {
            path: "Allorders",
            element: <AllOrders/>
        },
        


        
    ]
},


{
    path: "/",
    element:<UserBeforeLayout/>,
    children:[
        {
            path: "/home",
            element: <UserHomePage/>
        },
        {
            path: "About",
            element: <AboutPage/>
        },
        {
            path: "privacy",
            element: <Privacy/>
        },
        {
            path: "terms",
            element: <Terms/>
        },
        {
            path: "contact",
            element: <Contact/>
        },
        {
            path: "Iteam/:id",
            element: <IteamPage/>
        },
        {
            path: "AllProduct",
            element: <AllProducts/>
        },
       
        {
            path: "category/:categoryName",
            element: <ProductListByCategory/>
        },

        

]},



{
    path: "/",
    element:<RestAuth><ResturantLayout/></RestAuth>,
    children:[
       
        
        {
            path: "/dashboard",
            element: <Resturantdashboard/>
        },
        {
            path: "/AddProduct",
            element: <ResturantAddProduct/>
        },

        {
            path: "/ResturantBygetall",
            element: <ResturantByGetAllProduct/>
        },
        {
            path: "/ResturantGetById/:id",
            element: <ResturantGetById/>
        },
        
        {
            path: "/edit-product/:id",
            element: <ResturantProductEditById/>
        },
        {
            path: "/ResturantProfile",
            element: <ResturantProfile/>
        },
        {
            path: "/ResturantByOrders",
            element: <ResturantByOrders/>
        },
        
        

]},
    

])
