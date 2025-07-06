//https://codesandbox.io/p/sandbox/indeterminate-checkbox-forked-y5xjtn?file=%2Fsrc%2FIndeterminateCheckbox.jsx%3A9%2C14-9%2C22



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