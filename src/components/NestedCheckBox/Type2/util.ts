//https://codesandbox.io/p/sandbox/weathered-dream-cs7l4z?file=%2Fsrc%2FApp.js%3A31%2C71


export const modifyCheckBoxState = (checkBoxState=[], isChecked=false, selectedInput={}) => {
    const copycheckData = checkBoxState.slice();

    console.log("copycheckData ==>", copycheckData)
    
    const updateChild = (checkBoxTree, isCHek, seleId) => {
        const data = checkBoxTree.map(item => {
          if(item.id === seleId){
            let newItem = {...item,status: isCHek ? "checked": "unchecked"};
            let childArr = []
            if(item?.children?.length > 0){
                const updateChildInner = (dataArr=[]) => {
                  return dataArr.map(i => {
                    let obj = {...i, status: isCHek ? "checked": "unchecked"}
                     if(i?.children?.length > 0){
                        obj = { ...obj, children: updateChildInner(i?.children)}
                     }
                    return obj
                  })
                }
                childArr = updateChildInner(item?.children)
                return {...newItem, children:childArr}
            } else {
              return newItem
            }
           
          } else {
            item
          }


         return item.id === seleId ? {...item,status: isCHek ? "checked": "unchecked" } : item
       })

       return data;
    }

    const updatedState = updateChild(copycheckData, isChecked, selectedInput.id);
    console.log("updatedState ==>", updatedState)
    return updatedState
    
}


{/**
  
  
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

  const handleChange = (targetId) => {
    const cloneCheckboxState = JSON.parse(JSON.stringify(checkboxState));
    //we have 3 root nodes here.
    cloneCheckboxState.map((rootNode) => {
      traverse(targetId, rootNode);
    });

    setCheckboxState(cloneCheckboxState);
  };
  
*/}