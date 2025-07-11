import React from 'react';
import "./style.css";
import Header from './Header';
import Form from './Form';

const LayoutLogin = () => {
  return (
    <div>
     <Header />

      <div className="main">
        <Form />
      </div>
    </div>
  )
}

export default LayoutLogin