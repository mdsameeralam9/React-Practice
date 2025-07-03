import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';

interface OTPInputProps {
  inputLength: number;
  type: string;
  autoFocus: boolean;
  value: string;
  handleOtpValue: () => void;
}


const setOTPValueFromProps = (value:string, inputLength:number) => {
  let state = Array(inputLength).fill("")
  if(!value) return state;
  for(let i=0; i<inputLength; i++){
    state[i] = value[i]
  }
  return state;
}
   

const OtpInput: React.FC<OTPInputProps> = ({ value = "",handleOtpValue, inputLength = 4, type = "number", autoFocus = false }) => {
  const [otp, setOtp] = useState(setOTPValueFromProps(value, inputLength)); //Array(inputLength).fill("")
  const inputRefs = useRef<HTMLInputElement | null[]>([]);


  useEffect(() => {
    if (autoFocus) {
      inputRefs.current[0].focus()
    }
  }, [])

  // useEffect(() => {
  //   setOtp(setOTPValueFromProps(value, inputLength))
  // }, [value])


  // focusInput
  function focusInput(index: number) {
    inputRefs.current[index].focus()
  }

  // validation function
  const isValidInputValue = (value: string) => {
    // type = ['number', 'string', 'password', 'mixed'];
    let isValid = type === "number" ? !isNaN(parseInt(value)) : typeof value === 'string';
    return isValid && value.trim().length === 1
  }

  // handleChange
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    {/**
      const value = (e.target as HTMLInputElement).value; // 1
      const { value } = e.target as HTMLInputElement; // 2
      let typedValue: string | number = value
    */}


    // get last value from input value
    value = value.slice(-1)
    {/**
      //value = value.slice(-1);
      //value = value.substring(value.length-1);
      //value = value[value.length-1];
      value = value.charAt(value.length-1);
    */}


    // validataion
    if (value !== "" && !isValidInputValue(value)) {
      return;
    }

    const copyOTP = otp.slice();
    copyOTP[index] = value;
    setOtp(copyOTP);

    // focu input to next
    if (value) {
      handleOtpValue(copyOTP.join(""))
      if (index < inputLength - 1) focusInput(index + 1);
    }
  }

  // handle keydown to clear the input value when click backspace
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key)
    const isBackSpace = e.key === 'Backspace';
    if (isBackSpace && !otp[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  // handlePaste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let data = e.clipboardData.getData('Text').split("");
    let result = Array(inputLength).fill('');
    let lastIndex = 0
    for (let i = 0; i < data.length; i++) {
      result[i] = data[i];
      lastIndex = i
    }
    setOtp(result);
    focusInput(lastIndex)
  }

  return (
    <div className='OtpInput'>
      <h1>OTP Input</h1>
      {otp.map((val, index) => (
        <Input
          key={index}
          value={val}
          type={type}
          ref={(input) => {
            (inputRefs.current[index] = input)
          }}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  )
}

export default OtpInput