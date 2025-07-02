import { Fragment, useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import OtpInput from './components/OtpInput';

function App() {
  const [otpValue, setOtpValue] = useState<string>("");

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
    </Fragment>
  )
}

export default App
