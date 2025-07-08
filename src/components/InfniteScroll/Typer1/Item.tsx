import React from 'react';
import type { ItemInterface } from './ListItem';

interface ItemProps {
  data: ItemInterface;
}

const Item: React.FC<ItemProps> = ({ data }) => {
  return (
    <div className="inf_item">
      <img
        src={data?.thumbnail?.lqip}
        height="100%"
        width="100%"
        alt={`Thumbnail ${data?.id}`}
      />
    </div>
  );
};

export default Item;
