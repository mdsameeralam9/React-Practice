import React, { useRef, useState, useCallback, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface InfiniteScrollProps {
  className?: string;
  style?: React.CSSProperties;
  outerDivStyle?: React.CSSProperties;
  pullDownToRefresh?: boolean;
  pullDownToRefreshContent?: React.ReactNode;
  releaseToRefreshContent?: React.ReactNode;
  hasMore: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  maxPullDownDistance?: number;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  className = '',
  style,
  outerDivStyle,
  pullDownToRefresh = false,
  pullDownToRefreshContent,
  releaseToRefreshContent,
  hasMore,
  loader,
  endMessage,
  maxPullDownDistance = 50,
  children,
}) => {
  const infScrollRef = useRef<HTMLDivElement | null>(null);
  const pullDownRef = useRef<HTMLDivElement | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [pullToRefreshThresholdBreached, setPullToRefreshThresholdBreached] = useState(false);

  return (
    <div style={outerDivStyle} className="infinite-scroll-component__outerdiv">
      <div
        className={`infinite-scroll-component ${className}`}
        ref={infScrollRef}
        style={style}
      >
        {pullDownToRefresh && (
          <div style={{ position: 'relative' }} ref={pullDownRef}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: -1 * maxPullDownDistance,
              }}
            >
              {pullToRefreshThresholdBreached
                ? releaseToRefreshContent
                : pullDownToRefreshContent}
            </div>
          </div>
        )}

        {children}

        {!showLoader && hasMore && loader}
        {showLoader && hasMore && loader}
        {!hasMore && endMessage}
      </div>
    </div>
  );
};

export default InfiniteScroll;
