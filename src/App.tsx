import { Fragment, useCallback, useState } from 'react'
import './App.css'
import OtpInput from './components/OtpInput';

function App() {
  const [otpValue, setOtpValue] = useState<string>("");

  const handleOtpValue = useCallback((val: string) => {
    console.log(val)
    setOtpValue(val)
  }, [])

  const SepratorComponent = () => {
    return (
      <p>{"-"}</p>
    )
  }

  return (
    <Fragment>
      <OtpInput
        inputLength={4}
        type={'number'}
        autoFocus={true}
        value={otpValue}
        handleOtpValue={handleOtpValue}
        isDisabled={false}
        renderSeprator={() => <p>{"-"}</p>}
        SepratorComponent={SepratorComponent}
      />
    </Fragment>
  )
}

export default App
