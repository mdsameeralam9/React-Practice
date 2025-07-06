import React from 'react'
import InputTypeCheckBox, { type itemObj } from './Input';

interface CheckBoxProps {
  data: itemObj[];
  handleSetCheckbox: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ data, handleSetCheckbox }) => {
  return (
    <div>
      {data?.map(item => {
        return (
          <div className="parent" key={item.id}>
            <InputTypeCheckBox item={item} handleSetCheckbox={handleSetCheckbox} />
            {item?.children?.length > 0 &&
              <div className="childrend" style={{ marginLeft: "1rem" }}>
                <CheckBox data={item.children} handleSetCheckbox={handleSetCheckbox} />
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}

export default CheckBox