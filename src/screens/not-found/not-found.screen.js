/** @jsxImportSource @emotion/react */
import { Link, Title } from '../../components/styles-lib';

function NotFoundScreen() {
  return (
    <div
      css={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <Title type="white">404 Not Found </Title>{' '}
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}

export { NotFoundScreen };
