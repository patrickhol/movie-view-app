/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ModalBase } from './components/modal-base';
import { useAuth } from './contexts/auth-context';
import { Button, AppLogo } from './components/styles-lib';
import { Title } from './components/styles-lib';
import * as colors from './styles/colors';

function UnauthorizedApp() {
  const { onLogin } = useAuth();
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const onClose = () => setShowDialog(false);
  const login = () => {
    onLogin();
  };

  return (
    <>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.gray14,
          width: '100%',
          height: '100vh',
          backgroundImage: `url(bg-splash.jpeg)`,
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '300px',
            height: '300px',
            padding: '20px',
            opacity: 1,
            backgroundColor: 'rgba(3,3,3,.75)',
          }}
        >
          <AppLogo />
          <Button onClick={open}>Login</Button>
        </div>
      </div>

      <ModalBase open={showDialog} close={onClose} aria-label="modal">
        <Title>Sing In</Title>
        <div aria-label="modal">
          <Button type="secondary" onClick={login}>
            Login Anonymous
          </Button>
        </div>
      </ModalBase>
    </>
  );
}

export default UnauthorizedApp;
