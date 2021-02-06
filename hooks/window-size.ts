import { useCallback, useEffect, useState } from 'react';

export interface Hook {
  width: number | undefined;
  height: number | undefined;
}

/**
 * source: https://usehooks.com/useWindowSize/
 */
export function useWindowSize(): Hook {
  const getSize = useCallback(() => {
    const isClient = typeof window === 'object';
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }, []);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const isClient = typeof window === 'object';
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize]); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
