import React from 'react'
import type { GridItem } from './ReactMemoryGameComponent';

interface GridInterface {
  item: GridItem;
  handleCardClick: (id: number) => void;
  isFlippedCard: boolean;
  isPairMatched:boolean;
}

const Grid: React.FC<GridInterface> = ({ item, handleCardClick, isFlippedCard, isPairMatched }) => {
  return (
    <div style={{ pointerEvents: isPairMatched ? 'none' : 'auto', }} className={`memGrid  ${isPairMatched ?  "bgGreen" : (isFlippedCard ? "bgBlue" : "bgGray")}`} onClick={() => handleCardClick(item.id)}>{(isFlippedCard || isPairMatched) ? item.value : "?"}</div>
  )
}

export default Grid