import React from 'react'
import { Routes, Route } from 'react-router-dom'
import OTPComponent from '../components/OtpInput/OTPComponent'
import NestedComponent from '../components/NestedCheckBox/Type1'
import NestedCheckBox2 from '../components/NestedCheckBox/Type2/NestedCheckBox2'
import CheckBoxLayout from '../components/NestedCheckBox/CheckBoxLayout'
import InfniteScroll from '../components/InfniteScroll'
import Type2InfniteScroll from '../components/InfniteScroll/Type2/Type2InfniteScroll'
import InfiniteWithIntersectionObserver from '../components/InfniteScroll/Typer1/Layout'
import InfniteScrollWithHieght from '../components/InfniteScroll/Type3/InfniteScrollWithHieght'
import ReactHooksLayout from '../components/React_Hooks/ReactHooksLayout'
import Virtualisation from '../components/InfniteScroll/Virtualisation/Layout'
import LayoutLogin from '../components/AllFormTypes/Login/LayoutLogin'
import FileExplorer from '../components/FileExplorer'
import ImagePositioner from '../components/AllFormTypes/ImagesForm'
import MemoryGame from '../components/MemoryGame'

const Content = () => {
  return (
    <div className='_content'>
      <Routes>
        <Route path="/otp" element={<OTPComponent />} />
        <Route path="/nestedcheckbox" element={<CheckBoxLayout />}>
          <Route index element={<NestedComponent />} />
          <Route path="type2" element={<NestedCheckBox2 />} />
        </Route>

        <Route path='/' element={<InfniteScroll />}>
          <Route index element={<Type2InfniteScroll />} />
          <Route path="type2" element={<InfiniteWithIntersectionObserver />} />
          <Route path="type3" element={<InfniteScrollWithHieght />} />
           <Route path="type4" element={<Virtualisation />} />
        </Route>

        <Route path="/ReactHooksLayout" element={<ReactHooksLayout />}/>

        <Route path='/LayoutLogin' element={<ImagePositioner />}/>
       <Route path='/fileExplorer' element={<FileExplorer />}/>
       <Route path='/memoryGame' element={<MemoryGame />}/>

       
        
      </Routes>
    </div>
  )
}

export default Content

