import React from 'react'
import InfniteWithIntersectionObserver from './Typer1/Layout';
import "./Typer1/style.css"

const InfniteScroll:React.FC = () => {
  return (
    <div className='InfniteScrollWrap'>
        <h1>InfniteScroll Functionality</h1>
        <InfniteWithIntersectionObserver />
    </div>
  )
}

export default InfniteScroll