/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getMediaPlayInfo } from '../../services/media-api';
import { Title, LoadingSpinner, ErrorMsg } from '../../components/styles-lib';
import useWindowSize from '../../hooks/use-window-size';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '../../components/fallback-error';
import { STATUS_TYPES } from '../../constants/app-constants';
import { useAuth } from '../../contexts/auth-context';

function PlayerTitle({ label }) {
  return (
    <div css={{ margin: '30px' }}>
      <Title type="white">{label}</Title>
    </div>
  );
}

function PlayerPlay({ url }) {
  const { width } = useWindowSize();
  const [error, setError] = React.useState(null);

  if (error) {
    return (
      <ErrorMsg role="alert">
        {error.message} <br />
        Please try again later!
      </ErrorMsg>
    );
  }

  return (
    <div>
      {url && (
        <div>
          <ReactPlayer
            onError={(err) => {
              console.log(err);
              setError(err.error);
            }}
            width={width * 0.7}
            height={width * 0.7 * 0.5625}
            url={url}
            controls={true}
            playing={false}
          />
        </div>
      )}
    </div>
  );
}
function PlayerScreen() {
  const { movieId } = useParams();
  const [movie, setMovie] = React.useState('');
  const { user, onLogout } = useAuth();
  const { token } = user;
  const [error, setError] = React.useState(null);
  const [status, setStatus] = React.useState(STATUS_TYPES.init);

  // eslint-disable-next-line
  if (error?.status == '401') {
    onLogout();
  }

  const fetchMediaPlayInfo = React.useCallback(() => {
    setError(null);
    setStatus(STATUS_TYPES.inProgress);
    getMediaPlayInfo(movieId, token).then(
      (res) => {
        console.log(`res`, res);
        setMovie(res);
        setStatus(STATUS_TYPES.done);
      },
      (error) => {
        setError(error);
        setStatus(STATUS_TYPES.error);
      }
    );
  }, [movieId, token]);

  React.useEffect(() => {
    if (token && movieId) {
      fetchMediaPlayInfo();
    }
  }, [token, movieId, fetchMediaPlayInfo]);

  if (status === 'init') {
    return <LoadingSpinner />;
  } else if (status === 'inProgress') {
    return <LoadingSpinner />;
  } else if (status === 'error') {
    return <ErrorMsg role="alert">{error.message}</ErrorMsg>;
  } else if (status === 'done') {
    return (
      <>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
          }}
        >
          <ErrorBoundary FallbackComponent={FallbackError}>
            {movie?.Title && <PlayerTitle label={movie.Title} />}
            {movie?.ContentUrl ? (
              <PlayerPlay url={movie.ContentUrl} />
            ) : (
              <ErrorMsg role="alert">Please try again later!</ErrorMsg>
            )}
          </ErrorBoundary>
        </div>
      </>
    );
  }
}

export { PlayerScreen };
