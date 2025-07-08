import React, { useCallback, useState } from 'react';
import treeData, { STATUS } from './data';
import CheckBox from './CheckBox';
import type { itemObj } from './Input';
import { modifyCheckBoxState } from './util';

const NestedCheckBox2:React.FC = () => {
  const [checkBoxState, setCheckBoxState] = useState<itemObj[]>([...treeData]);

  // const handleSetCheckbox = (isChecked:boolean=false, data:itemObj={}) => {
  //   //console.log("handleSetCheckbox called", isChecked, data);
  //   const updatedCheckState = modifyCheckBoxState([...checkBoxState], isChecked, data)
  //  // console.log(updatedCheckState);
  //  setCheckBoxState(updatedCheckState)
  // }

  //https://www.youtube.com/playlist?list=PLnNsQf3QlMxXD9Vnd4SeIsO0WszaZoEg9

  const computeStatus = (node) => {
    if (!node.children || !node.children.length > 0) {
      return;
    }
    let checkedCount = 0;
    let uncheckedCount = 0;
    let indeterminateCount = 0;
    node.children.map((child) => {
      if (child.status === STATUS.CHECKED) checkedCount++;
      if (child.status === STATUS.UNCHECKED) uncheckedCount++;
      if (child.status === STATUS.INDETERMINATE) indeterminateCount++;
    });
    if (checkedCount === node.children.length) {
      node.status = STATUS.CHECKED;
    } else if (uncheckedCount === node.children.length) {
      node.status = STATUS.UNCHECKED;
    } else if (checkedCount > 0 || indeterminateCount > 0) {
      node.status = STATUS.INDETERMINATE;
    }
  };

  const traverse = (targetId, node, isDescendent, ancestorStatus) => {
    if (node.id === targetId) {
      if (node.status === STATUS.CHECKED) {
        node.status = STATUS.UNCHECKED;
      } else {
        node.status = STATUS.CHECKED;
      }
    }
    if (isDescendent) {
      node.status = ancestorStatus;
    }
    if (node.children && node.children.length > 0)
      node.children.map((child) => {
        traverse(
          targetId,
          child,
          node.id === targetId || isDescendent,
          node.status
        );
      });
    computeStatus(node);
  };

  const handleSetCheckbox = (targetId) => {
    console.log(targetId)
    const cloneCheckboxState = JSON.parse(JSON.stringify(checkBoxState));
    //we have 3 root nodes here.
    cloneCheckboxState.map((rootNode) => {
      traverse(targetId, rootNode);
    });

    setCheckBoxState(cloneCheckboxState);
  };

  return (
    <div>
        <h1>Second Approach</h1>
        <CheckBox data={checkBoxState} handleSetCheckbox={handleSetCheckbox}/>
    </div>
  )
}

export default NestedCheckBox2