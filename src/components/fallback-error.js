import * as React from 'react';
import { ErrorMsg } from './styles-lib';

export function FallbackError({ error }) {
  return <ErrorMsg role="alert">{error.message}</ErrorMsg>;
}
