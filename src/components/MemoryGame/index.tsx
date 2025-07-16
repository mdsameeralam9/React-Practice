import React, { useState } from 'react';
import ReactMemoryGameComponent from './ReactMemoryGameComponent';
import "./style.css";

const MemoryGame = () => {
    const [inputSize, setInputSize] = useState(4);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "" && (Number(e.target.value) < 1 || Number(e.target.value) > 10)) {
            return false;
        }
        setInputSize(Number(e.target.value))
    }

    return (
        <div className='MemoryGameComponent'>
            <h1>Memory Game</h1>
            <div className="inputWrap">
                <label>Grid Size:</label>
                <input type='number' value={inputSize} onChange={handleChange} style={{ width: "60px", height: "40px", textAlign: "center" }} />
            </div>

            <ReactMemoryGameComponent
                size={inputSize}
            />
        </div>
    )
}

export default MemoryGame