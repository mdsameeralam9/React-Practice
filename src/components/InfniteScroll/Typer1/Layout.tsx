import React, { useRef, useState, useCallback } from 'react';
import ListItem, { type ItemInterface } from './ListItem';
import Loader from './Loader';

//https://www.youtube.com/watch?v=I40pArhtXWw&t=146s
// 

const InfiniteWithIntersectionObserver: React.FC = () => {
  const [apiData, setApiData] = useState<ItemInterface[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const page = useRef<number>(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetcher = async () => {
    if(!hasMoreData) return;
    
    const API = `https://api.artic.edu/api/v1/artworks/search?q=cats&page=${page.current}`;
    setLoader(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("API failed to fetch");
      const json = await res.json();
      if(json?.data?.length === 0){
        setHasMoreData(false)
      }
      page.current++;
      if(hasMoreData){
       setApiData((prev) => [...prev, ...json?.data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const lastElementLoaderNode = useCallback((node: Element | null) => {
    if (!node || loader) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          fetcher();
        }
      },
      { threshold: 1 }
    );

    observer.current.observe(node);
  }, [loader]);

  return (
    <div className="_mainWrap">
      <ListItem apiData={apiData} />
      <Loader ref={lastElementLoaderNode} />
    </div>
  );
};

export default InfiniteWithIntersectionObserver;
