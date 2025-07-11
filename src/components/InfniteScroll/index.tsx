import React from 'react'
import "./Typer1/style.css"
import { Link, Outlet } from 'react-router-dom';


const InfniteScroll: React.FC = () => {
  return (
    <div className='InfniteScrollWrap'>
      <h1>InfniteScroll Functionality</h1>
      <div className="flexWrap" style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Infnite Scroll Type 1</Link>
        <Link to="/type2">Infnite Scroll Type 2</Link>
        <Link to="/type3">Infnite Scroll Type 3</Link>
        <Link to="/type4">VirtualList</Link>

      </div>
      <Outlet />
    </div>
  )
}

export default InfniteScroll