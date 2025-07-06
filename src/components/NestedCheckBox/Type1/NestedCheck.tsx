import React, { Fragment, useCallback } from 'react';
import type { NestedItem } from './data';
import nestedCheckboxData from './data';

interface NestedCheckProps {
  data: NestedItem[];
  checkedState: { [key: string]: boolean };
  setCheckedState: (newState: { [key: string]: boolean }) => void;
}

const NestedCheck: React.FC<NestedCheckProps> = ({ data = [], checkedState = {}, setCheckedState }) => {
  const handleChecked = useCallback(
    (isChecked: boolean, selectedItem: NestedItem) => {
      const copyObj: { [key: string]: boolean } = { ...checkedState };
      copyObj[selectedItem.id] = isChecked;

      const updateChildren = (childData: NestedItem[] = []) => {
        if (!childData) return;

        for (const itm of childData) {
          copyObj[itm.id] = isChecked;

          if (itm?.children?.length > 0) {
            updateChildren(itm.children);
          }
        }
      };
      updateChildren(selectedItem?.children);

      const updatedParent = (dataTree: NestedItem[] = [], idx: string = ''): NestedItem | undefined => {
        for (const itm of dataTree) {
          const isFound = itm?.children?.some((i) => i.id === idx);
          if (isFound) return itm;

          // notfound then
          if (itm?.children?.length > 0) {
            const idFoundChild = updatedParent(itm?.children, idx);
            if (idFoundChild) return idFoundChild;
          }
        }
        return undefined; // Explicitly return undefined if not found
      };

      let parent = updatedParent(nestedCheckboxData, selectedItem.id);

      while (parent) {
        copyObj[parent.id] = isChecked;
        parent = updatedParent(nestedCheckboxData, parent.id);
      }

      setCheckedState((p) => ({ ...p, ...copyObj }));
    },
    [checkedState, setCheckedState]
  );

  return (
    <div className="checkWrap" style={{ display: 'flex', flexDirection: 'column' }}>
      {data.map((item) => {
        return (
          <Fragment key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={checkedState[item.id] ?? false}
                onChange={(e) => handleChecked(e.target.checked, item)}
              />
              {item.name}
            </label>

            {item?.children?.length > 0 && (
              <div className="childWrap" style={{ marginLeft: '15px' }}>
                <NestedCheck data={item.children} checkedState={checkedState} setCheckedState={setCheckedState} />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default NestedCheck;