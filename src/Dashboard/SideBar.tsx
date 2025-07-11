import React from 'react'
import { Link } from 'react-router-dom'

const sideBarData = [
  {id: 1, label: "Infnite Component", to: "/infniteScroll"},
  {id: 2, label: "Otp Component", to: "/otp"},
  {id: 3, label: "Nexted Checkbox", to: "/nestedcheckbox"},
  {id: 4, label: "React Logic", to: "/"},
  {id: 5, label: "React LayoutLogin", to: "/LayoutLogin"}
]


const SideBar = () => {
  return (
    <div className='_sideBar'>
        <h3>Recat Component</h3>
        <div className="_links">
          {sideBarData.map(d => (
          <Link key={d.id} to={d.to}>{d.label}</Link>
          ))}
        </div>
    </div>
  )
}

export default SideBar