/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled/macro';
import { RiMovie2Line, RiCloseFill } from 'react-icons/ri';
import { BiCameraMovie } from 'react-icons/bi';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import * as colors from '../styles/colors';
import { Link as RouterLink } from 'react-router-dom';

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled(RiMovie2Line)({
  animation: `${rotate} 1.2s linear infinite`,
});

function LoadingSpinner() {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '5em',
        color: colors.white,
      }}
    >
      <Spinner />
    </div>
  );
}

const buttonType = {
  default: {
    background: colors.primary,
    color: colors.white,
  },
  secondary: {
    background: colors.secondary,
    color: colors.white,
  },
};

const ErrorMsg = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  fontSize: '1em',
  color: colors.danger,
});

const Button = styled.button(
  {
    padding: '8px 16px',
    border: '0',
    lineHeight: '1',
    borderRadius: '2px',
    width: '100%',
    ':hover,:focus': {
      cursor: 'pointer',
    },
  },
  ({ type = 'default' }) => buttonType[type]
);

const titleType = {
  default: {
    color: colors.black,
  },
  white: {
    color: colors.white,
  },
};

const Title = styled.span(
  {
    fontSize: ' 1.5rem',
  },
  ({ type = 'default' }) => titleType[type]
);

const Logo = styled(BiCameraMovie)();

function AppLogo() {
  return (
    <div
      css={{
        color: colors.primary,
        fontSize: '5em',
      }}
    >
      <Logo />
    </div>
  );
}

const Link = styled(RouterLink)({
  color: colors.primary,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
});

const CloseIcon = styled(RiCloseFill)({
  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  color: colors.black,
  fontSize: '3em',
  ':hover,:focus': {
    cursor: 'pointer',
    transform: 'scale(1.1)',
  },
});

const ArrowLeft = styled(MdChevronLeft)({
  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  color: colors.white,
  fontSize: '5em',
  ':hover,:focus': {
    cursor: 'pointer',
    transform: 'scale(1.1)',
  },
});

const ArrowRight = styled(MdChevronRight)({
  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  color: colors.white,
  fontSize: '5em',
  ':hover,:focus': {
    cursor: 'pointer',
    transform: 'scale(1.1)',
  },
});

const WIDTH = 295;
const RATIO_16_9 = 0.5625;
const HEIGHT = WIDTH * RATIO_16_9;

const CoverBase = styled.img({
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: '10px',
  transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
  width: `${WIDTH}px`,
  height: `${HEIGHT}px`,
  objectFit: 'cover',
  zIndex: 1,
  ':hover,:focus': {
    cursor: 'pointer',
    zIndex: 2,
    transform: 'scale(1.1)',
  },
});

function Cover({ image }) {
  return (
    <>
      <CoverBase src={image} />
    </>
  );
}

export {
  Spinner,
  LoadingSpinner,
  Button,
  AppLogo,
  Link,
  Title,
  CloseIcon,
  ArrowLeft,
  ArrowRight,
  Cover,
  ErrorMsg,
};
