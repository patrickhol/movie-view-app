import * as React from 'react';
import { LoadingSpinner } from './components/styles-lib';
import { useAuth } from './contexts/auth-context';

const AuthApp = React.lazy(() => import('./auth-app'));
const UnauthorizedApp = React.lazy(() => import('./unauthorized-app'));

function App() {
  const { user } = useAuth();

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      {user.token ? <AuthApp /> : <UnauthorizedApp />}
    </React.Suspense>
  );
}

export default App;
