import React, { useState } from 'react'
import InfniteScroll from './InfniteScroll'

const InfniteScrollWithHieght = () => {
  const [data, setData] = useState([...new Array(20)])

  const renderList = () => {
    return(
       <>
            {data.map((i,indx) => (
                <p style={{height: "40px", border:"1px solid", width: "300px", background: "lightyellow"}} key={indx}>{indx+1}</p>
            ))}
       </>
    )
  }


  return (
    <div>
        <InfniteScroll
        setData={setData}
        >
           {renderList()}
        </InfniteScroll>
    </div>
  )
}

export default InfniteScrollWithHieght