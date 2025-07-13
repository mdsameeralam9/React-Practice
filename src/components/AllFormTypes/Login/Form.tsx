import React, { useState } from 'react';
import Button from './Button';
import { axiosInstance } from './axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom';


const Form = () => {
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = "/LayoutLogin/dashboardAfter" // location.state?.from?.pathname ?? "/LayoutLogin/dashboardAfter"

  console.log(location)

  const handleFormSubmit = async(formData) => {
    const formdata = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    // api call
    
    const res = await axiosInstance.post('/login', formdata);
    console.log(res)
    // and get token and store it at frontend
    // redirecto dashboard
    navigate(fromLocation, {replace: true})
  };

  return (
    <div className='formWrap'>
      <form action={handleFormSubmit}>
         {/* <div className="item">
          <label>Name</label>
          <input type='name' name='name' />
        </div> */}
        <div className="item">
          <label>Email</label>
          <input type='email' name='email' />
        </div>
        <div className="item">
          <label>Password</label>
          <input type='password' name='password' />
        </div>
        <Button />
      </form>
    </div>
  );
};

export default Form;
