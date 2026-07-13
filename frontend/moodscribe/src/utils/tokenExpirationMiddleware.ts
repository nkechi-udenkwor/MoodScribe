import { Middleware, isAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import { signout } from '../redux/auth/features';
import { isTokenExpired } from './helpers';
import { toast } from 'sonner';

const toastId = 'session-expired';

type AuthState = {
  signin: {
    token: string | null;
    isAuthenticated: boolean;
  };
};

type RehydrateAction = {
  type: typeof REHYDRATE;
  payload?: AuthState;
};

const syncTokenWithStorage = (state: AuthState) => {
  const storedToken = localStorage.getItem('token');
  const reduxToken = state.signin.token;

  if (reduxToken && !storedToken) {
    localStorage.setItem('token', reduxToken);
    return reduxToken;
  }

  return storedToken ?? reduxToken;
};

const tokenExpirationMiddleware: Middleware = (store) => {
  let isDispatching = false;

  return (next) => (action) => {
    if (isAction(action) && action.type === REHYDRATE) {
      const signin = (action as RehydrateAction).payload?.signin;
      if (signin?.token) {
        localStorage.setItem('token', signin.token);
      }
      return next(action);
    }

    if (!isDispatching) {
      const state = store.getState() as AuthState;
      const token = syncTokenWithStorage(state);
      const isAuthenticated = state.signin.isAuthenticated;

      if (isAuthenticated && !token) {
        isDispatching = true;
        store.dispatch(signout());
        isDispatching = false;
        toast.error('Your session expired. Please log in again.', {
          id: toastId,
        });
        if (window.location.pathname !== '/auth/signin') {
          window.location.href = '/auth/signin';
        }
        return;
      }

      if (token && isTokenExpired(token)) {
        isDispatching = true;
        store.dispatch(signout());
        isDispatching = false;
        toast.error('Your session timed out. Please log in to continue.', {
          id: toastId,
        });
        if (window.location.pathname !== '/auth/signin') {
          window.location.href = '/auth/signin';
        }
        return;
      }
    }

    return next(action);
  };
};

export default tokenExpirationMiddleware;
