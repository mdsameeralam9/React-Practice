import React from 'react';
import type { Ref } from 'react';

interface LoaderProps{
  ref?: Ref<HTMLDivElement>;
}

const Loader:React.FC<LoaderProps> = ({ ref }) => {
  return (
    <div ref={ref}>Loader...</div>
  )
}

export default Loader