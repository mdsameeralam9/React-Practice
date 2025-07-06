import React, { useCallback, useState } from 'react';
import treeData from './data';
import CheckBox from './CheckBox';
import type { itemObj } from './Input';
import { modifyCheckBoxState } from './util';

const NestedCheckBox2:React.FC = () => {
  const [checkBoxState, setCheckBoxState] = useState<itemObj[]>(structuredClone(treeData));

  const handleSetCheckbox = (isChecked:boolean=false, data:itemObj={}) => {
    //console.log("handleSetCheckbox called", isChecked, data);
    const updatedCheckState = modifyCheckBoxState([...checkBoxState], isChecked, data)
   // console.log(updatedCheckState);
   setCheckBoxState(updatedCheckState)
  }

  return (
    <div>
        <h1>Second Approach</h1>
        <CheckBox data={checkBoxState} handleSetCheckbox={handleSetCheckbox}/>
    </div>
  )
}

export default NestedCheckBox2