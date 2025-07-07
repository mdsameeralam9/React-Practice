import React, { useEffect, useRef } from 'react';

export interface itemObj {
    id: string;
    label: string;
    status: string;
    children: itemObj[]
}

interface InputTypeCheckBoxProps {
    item: itemObj;
    handleSetCheckbox: () => void;
}

const InputTypeCheckBox: React.FC<InputTypeCheckBoxProps> = ({ item, handleSetCheckbox }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (item.status === "indeterminate") {
            inputRef.current.indeterminate = true
        } else {
            inputRef.current.indeterminate = false
        }

    }, [item.status])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, selectedInput: itemObj = {}) => {
      const isChecked = e.target.checked;
      //handleSetCheckbox(isChecked, selectedInput)
       handleSetCheckbox(selectedInput.id)
    }

    return (
        <label>
            <input onChange={(e) => handleChange(e, item)} ref={inputRef} type='checkbox' checked={item.status === "checked" ? true: false} />
            {item.label}
        </label>
    )
}

export default InputTypeCheckBox