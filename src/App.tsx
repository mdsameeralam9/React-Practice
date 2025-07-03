import { Fragment, useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OtpInput from './components/OtpInput';
import { OtpInputr } from './components/OtpInput/test';

function App() {
  const [otpValue, setOtpValue] = useState<string>("23");

  const handleOtpValue = useCallback((val: string) => {
    console.log(val)
    setOtpValue(val)
  }, [])

  console.log(otpValue)

  return (
    <Fragment>
      <OtpInput
        inputLength={4}
        type={'number'}
        autoFocus={true}
        value={otpValue}
        handleOtpValue={handleOtpValue}
      
      
      />


      <OtpInputr value="324354645"/>
    </Fragment>
  )
}

export default App
