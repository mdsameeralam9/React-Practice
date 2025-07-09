import React, { ReactNode, UIEvent } from 'react';

const stylesrollWraper: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflow: 'auto',
  height: '400px',
};

const THRESHOLD = 20;

interface InfiniteScrollProps {
  children: ReactNode;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ children, setData }) => {
  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    const remainScroll = scrollHeight - (scrollTop + clientHeight);

    if (remainScroll < THRESHOLD) {
      setData((prev) => [...prev, ...new Array(10).fill(null)]);
    }
  }

  return (
    <div
      style={stylesrollWraper}
      className="scrollWrapper"
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
};

export default InfiniteScroll;
