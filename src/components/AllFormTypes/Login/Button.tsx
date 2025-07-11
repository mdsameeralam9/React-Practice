import React from 'react'
import { useFormStatus } from 'react-dom'

const Button = () => {
  const { pending, data, method, action,  } = useFormStatus();
  console.log(pending, data, method, action)
  
  return (
    <button className='buttonF' disabled={pending}>{pending ? "Loading..." : "Submit"}</button>
  )
}

export default Button