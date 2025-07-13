import React from 'react';
import "./style.css";
import Header from './Header';
import Form from './Form';
import { Route, Routes } from 'react-router-dom';
import DashboardAfter from './Pages/DashboardAfter';

const LayoutLogin = () => {
  return (
    <div>
     <Header />
      <div className="main">
        <Routes>
          <Route index element={<Form />}/>
          <Route path="/LayoutLogin/dashboardAfter" element={<DashboardAfter />}/>
        </Routes>
      </div>
    </div>
  )
}

export default LayoutLogin