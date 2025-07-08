import React from 'react'
import InfniteWithIntersectionObserver from './Typer1/Layout';
import "./Typer1/style.css"
import { Link, Outlet } from 'react-router-dom';


const InfniteScroll:React.FC = () => {
  return (
    <div className='InfniteScrollWrap'>
        <h1>InfniteScroll Functionality</h1>
         <Link to="/">Infnite Scroll Type 1</Link>
         <Link to="/type2">Infnite Scroll Type 2</Link>
         <Outlet />
       
    </div>
  )
}

export default InfniteScroll