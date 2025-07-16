import React from 'react'
import type { GridItem } from './ReactMemoryGameComponent';

interface GridInterface {
  item:GridItem;
  handleCardClick: (item: GridItem) => void;
}

const Grid:React.FC<GridInterface> = ({ item, handleCardClick }) => {
  return (
    <div className='memGrid' onClick={() => handleCardClick(item)}>{item.value}</div>
  )
}

export default Grid