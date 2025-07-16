import React from 'react'
import type { GridItem } from './ReactMemoryGameComponent';

interface GridInterface {
  item:GridItem;
  handleCardClick: (id: number) => void;
  inIncluded:boolean;
}

const Grid:React.FC<GridInterface> = ({ item, handleCardClick, inIncluded }) => {
  return (
    <div className={`${inIncluded && "bgBlue"} memGrid`} onClick={() => handleCardClick(item.id)}>{inIncluded ? item.value : "?"}</div>
  )
}

export default Grid