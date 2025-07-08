import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OTPComponent from '../components/OtpInput/OTPComponent'
import NestedComponent from '../components/NestedCheckBox/Type1'
import NestedCheckBox2 from '../components/NestedCheckBox/Type2/NestedCheckBox2'
import CheckBoxLayout from '../components/NestedCheckBox/CheckBoxLayout'
import InfniteScroll from '../components/InfniteScroll'

const Content = () => {
  return (
    <div className='_content'>
      <Routes>
        <Route path="/otp" element={<OTPComponent />} />
        <Route path="/nestedcheckbox" element={<CheckBoxLayout />}>
         <Route index element={<NestedComponent />} />
         <Route path="type2" element={<NestedCheckBox2 />} />
        </Route>
        <Route path="/" element={<InfniteScroll />}/> 
        
      </Routes>
    </div>
  )
}

export default Content

