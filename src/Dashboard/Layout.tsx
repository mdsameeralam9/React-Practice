import React from 'react'
import SideBar from './SideBar'
import Content from './Content'
import { BrowserRouter } from 'react-router-dom'

const Layout = () => {
    return (
        <BrowserRouter>
            <div className='_layout'>
                <SideBar />
                <Content />
            </div>
        </BrowserRouter>
    )
}

export default Layout