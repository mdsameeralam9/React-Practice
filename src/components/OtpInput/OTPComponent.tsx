import { useCallback, useState } from 'react'
import './style.css'
import OtpInput from '.';


function OTPComponent() {
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

    )
}

export default OTPComponent
