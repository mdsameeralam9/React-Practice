import React from 'react';
import Button from './Button';
import { axiosInstance } from './axiosInstance';

// function delay() {
//   return new Promise((res) => setTimeout(() => res("hello"), 3000));
// }

const Form = () => {
  const handleFormSubmit = async(formData) => {
    const formdata = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      "avatar": "https://picsum.photos/800"
    }

    // simulate delay
    //await delay();

    // api call
    
    const res = await axiosInstance.post('/users/', formdata);
    console.log(res)
    // and get token and store it at frontend
    // redirecto dashboard

   
   
  };

  return (
    <div className='formWrap'>
      <form action={handleFormSubmit}>
         <div className="item">
          <label>Name</label>
          <input type='name' name='name' />
        </div>
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
