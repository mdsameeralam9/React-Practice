import React, { useState, useEffect, useRef, useCallback } from 'react';
import InfiniteScroll from './InfiniteScroll';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Type2InfniteScroll: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchPosts = async () => {
    if (!hasMore) return;
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
    const data: Post[] = await res.json();

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...data]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const lastPostRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<p>Loading...</p>}
      endMessage={<p>No more posts to load.</p>}
    >
      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastPostRef : null}
          style={{
            border: '1px solid #ccc',
            margin: '1rem 0',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Type2InfniteScroll;
