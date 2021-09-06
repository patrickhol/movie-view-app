import * as React from 'react';
import { Element } from '../screens/home/home-screen';

function MovieFallback() {
  const fallbackPMovieData = {
    Id: '333',
    Images: [{ Url: '/fallback-image.jpg' }],
  };
  return <Element item={fallbackPMovieData} />;
}

export { MovieFallback };
