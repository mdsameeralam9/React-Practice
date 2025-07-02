import React, { Ref } from 'react';

interface InputProps{
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    type: string;
    value: string;
    ref?: Ref<HTMLInputElement>;
    autoFocus?: boolean;
}

const Input:React.FC<InputProps> = (props) => {
    const { onChange, onKeyDown, onPaste, ref, type, value, autoFocus } = props;
    
    return (
        <input
            className='_input-box'
            value={value}
            type={type}
            //inputMode="numeric"
            //pattern={'\d*'}
            //autoFocus={autoFocus}
            ref={ref}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
        />
    )
}

export default Input