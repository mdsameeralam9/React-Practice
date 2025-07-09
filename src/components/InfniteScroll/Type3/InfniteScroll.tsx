import React from 'react'

const stylesrollWraper = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflow: "auto",
    height: "400px"
}

const InfniteScroll = ({ children, setData }) => {
    function handleScroll(e) {
        const { scrollHeight, clientHeight, scrollTop } = e.target
        const remainScroll = scrollHeight - (scrollTop + clientHeight)
        if (remainScroll < 20) {
            setData(p => [...p, ...new Array(10)])
        }
    }

    return (
        <div
            style={stylesrollWraper}
            className='srollWraper'
            onScroll={handleScroll}
        >{children}
        </div>
    )
}

export default InfniteScroll