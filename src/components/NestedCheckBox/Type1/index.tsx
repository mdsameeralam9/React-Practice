import React, { Fragment } from 'react';
import NestedCheck from './NestedCheck';
import nestedCheckboxData from "./data";

const NestedComponent: React.FC = () => {
  const [checkedState, setCheckedState] = React.useState<{ [key: string]: boolean }>({});

  return (
    <NestedCheck
      data={nestedCheckboxData}
      checkedState={checkedState}
      setCheckedState={setCheckedState}
    />

  )
}

export default NestedComponent