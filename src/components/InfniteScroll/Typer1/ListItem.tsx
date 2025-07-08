import React from 'react'
import Item from './Item'


export interface ItemInterface{
   id: number;
   thumbnail?: {
    lqip?: string;
   } 
}

export interface APIresProps{
   apiData: ItemInterface[] 
}

const ListItem: React.FC<APIresProps> = ({ apiData=[] }) => {
    return (
        <div className='inf-com-loadwrap'>
            <div className='inf_ListItem'>
                {apiData?.map((data, idx) => (
                    <Item
                        data={data}
                        key={idx}
                    />
                ))}
            </div>
        </div>

    )
}

export default ListItem