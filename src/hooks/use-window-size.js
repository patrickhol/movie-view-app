import * as React from 'react';

const useWindowSize = () => {
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);

  const handleWindowChange = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowChange);
    return () => window.removeEventListener('resize', handleWindowChange);
  }, []);

  return { width, height };
};

export default useWindowSize;
