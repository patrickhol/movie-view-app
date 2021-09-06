import React, { useState } from 'react';
import { fetchToken } from '../services/media-api';
const AuthContext = React.createContext();

const TOKEN_KEY = 'movie-view-app-token';
function initState() {
  return { token: '' };
}

function AuthProvider(props) {
  const [user, setUser] = useState(initState());
  const getTokenFromLocalStorage = localStorage.getItem(TOKEN_KEY);
  const ifToken = getTokenFromLocalStorage ? getTokenFromLocalStorage : '';

  if (ifToken && !user.token) {
    setUser({ token: JSON.parse(ifToken) });
  }

  function onLogin() {
    fetchToken().then((res) => {
      setUser({ token: res });
      localStorage.setItem(TOKEN_KEY, JSON.stringify(res));
    });
  }

  function onLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(initState());
  }

  const { children } = props;

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be in AuthProvider`);
  }
  return context;
}

export { AuthProvider, AuthContext, useAuth };
