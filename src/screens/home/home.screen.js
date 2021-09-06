/** @jsxImportSource @emotion/react */
import * as React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Cover,
  LoadingSpinner,
  ErrorMsg,
} from '../../components/styles-lib';
import { getMediaList } from '../../services/media-api';
import { Link } from 'react-router-dom';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { ErrorBoundary } from 'react-error-boundary';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

import useWindowSize from '../../hooks/use-window-size';
import { FallbackError } from '../../components/fallback-error';
import { STATUS_TYPES } from '../../constants/app-constants';
import { useAuth } from '../../contexts/auth-context';

SwiperCore.use([Navigation, Pagination]);

function MoviesScroll({ list }) {
  const { width } = useWindowSize();
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <div css={{ display: 'flex', position: 'relative', marginTop: '100px' }}>
      <div
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          width: '4%',
          height: '100%',
          background: 'rgba(3,3,3, 0.5)',
          zIndex: 10,
          ':hover,:focus': {
            cursor: 'pointer',
          },
        }}
        ref={navigationPrevRef}
      >
        <ArrowLeft />
      </div>
      <div
        css={{
          position: 'absolute',
          right: 0,
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          width: '4%',
          height: '100%',
          background: 'rgba(3,3,3, 0.5)',
          zIndex: 10,
        }}
        ref={navigationNextRef}
      >
        <ArrowRight />
      </div>
      <Swiper
        slidesPerView={
          parseInt(width / 300) <= list.length
            ? parseInt(width / 300)
            : list.length
        }
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
      >
        {list &&
          list.map((result) => (
            <SwiperSlide key={result.Id}>
              <Element item={result} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

function Element({ item }) {
  const width = 295;
  const height = width * 0.5625;
  return (
    <div
      css={{
        borderRadius: '10px',
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 1,
      }}
    >
      <Link to={`/player/${item.Id}`}>
        <Cover image={item?.Images[0]?.Url ?? '/fallback-image.jpg'} />
      </Link>
    </div>
  );
}
export { Element };

function initList() {
  return Array.from({ length: 15 }, (v, k) => {
    return { Id: k, Images: [{ Url: '/fallback-image.jpg' }] };
  });
}

function HomeScreen() {
  const { user, onLogout } = useAuth();
  const { token } = user;
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState(STATUS_TYPES.init);
  const [movieList, setMovieList] = React.useState(initList());
  const [movieListSecond, setMovieListSecond] = React.useState(initList());

  // eslint-disable-next-line
  if (error?.status == '401') {
    onLogout();
  }

  const fetchMediaList = React.useCallback(() => {
    setStatus(STATUS_TYPES.inProgress);
    getMediaList(token, 2).then(
      (res) => {
        setMovieList(res.Entities);
        setStatus(STATUS_TYPES.done);
      },
      (error) => {
        setError(error);
        setStatus(STATUS_TYPES.error);
      }
    );
  }, [token]);

  React.useEffect(() => {
    if (token) {
      setError(null);
      fetchMediaList();
    }
  }, [fetchMediaList, token]);

  const fetcSecondMediaList = React.useCallback(() => {
    setStatus(STATUS_TYPES.inProgress);
    getMediaList(token, 3).then(
      (res) => {
        setMovieListSecond(res.Entities);
        setStatus(STATUS_TYPES.done);
      },
      (error) => {
        setError(error);
        setStatus(STATUS_TYPES.error);
      }
    );
  }, [token]);

  React.useEffect(() => {
    if (token) {
      setError(null);
      fetcSecondMediaList();
    }
  }, [fetcSecondMediaList, token]);

  if (status === 'init') {
    return <LoadingSpinner />;
  } else if (status === 'inProgress') {
    return <LoadingSpinner />;
  } else if (status === 'error') {
    return <ErrorMsg role="alert">{error.message}</ErrorMsg>;
  } else if (status === 'done') {
    return (
      <>
        {movieList && (
          <ErrorBoundary FallbackComponent={FallbackError}>
            <MoviesScroll list={movieList} />
          </ErrorBoundary>
        )}
        {movieListSecond && (
          <ErrorBoundary FallbackComponent={FallbackError}>
            <MoviesScroll list={movieListSecond} />
          </ErrorBoundary>
        )}
      </>
    );
  }
}

export { HomeScreen };
