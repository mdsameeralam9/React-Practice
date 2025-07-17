import React, { useState, Profiler } from 'react';
import ReactMemoryGameComponent from './ReactMemoryGameComponent';
import "./style.css";

const MemoryGame = () => {
    const [inputSize, setInputSize] = useState(4);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "" && (Number(e.target.value) < 2 || Number(e.target.value) > 10)) {
            return false;
        }
        setInputSize(Number(e.target.value))
    }

    const callbackFunction = (
        id, // the "id" prop of the Profiler tree that has just committed
        phase, // either "mount" (initial render) or "update"
        actualDuration, // time spent rendering the committed update
        baseDuration, // estimated time to render the entire subtree without memoization
        startTime, // when React began rendering this update
        commitTime, // when React committed this update
        interactions // the Set of interactions belonging to this update
    ) => {
        console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime, interactions });
    };


    return (
        <div className='MemoryGameComponent'>
            <h1>Memory Game</h1>
            <div className="inputWrap">
                <label>Grid Size:</label>
                <input type='number' value={inputSize} onChange={handleChange} style={{ width: "60px", height: "40px", textAlign: "center" }} />
            </div>

            <Profiler id="ReactMemoryGameComponent" onRender={callbackFunction}>
                <ReactMemoryGameComponent
                    size={inputSize}
                />
            </Profiler>

        </div>
    )
}

export default MemoryGame