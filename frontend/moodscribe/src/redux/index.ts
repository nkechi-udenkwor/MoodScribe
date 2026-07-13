/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { store } from './store';
import { signout } from './auth/features';

const toastId = 'Sonner';

export const handleErrors = (err: any) => {
  const response = err.response;
  switch (response?.status) {
    case 500:
      toast.error(response.data.message, { id: toastId });
      break;

    case 400:
    case 401:
    case 404:
    case 403:
    case 422:
      if (response.status === 401) {
        const authError = response.data?.error;
        if (authError === 'Missing Token' || authError === 'Invalid Token') {
          store.dispatch(signout());
        }
      }

      if (response.data.errors) {
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((each: any, idx: number) => {
            toast.error(each.message, { id: idx });
          });
        } else if (typeof response.data.errors === 'object') {
          if (response.data.errors.length > 0) {
            Object.keys(response.data.errors).forEach((field, idx) => {
              const errors = response.data.errors[field];
              errors.forEach((errorMessage: any) => {
                toast.error(errorMessage, { id: idx });
              });
            });
          } else {
            toast.error(response.data.errors.message, { id: toastId });
          }
        }
      } else if (response.data.error) {
        toast.error(response.data.error, { id: toastId });
      } else {
        toast.error(response.data.message, { id: toastId });
      }
      break;

    default:
      toast.error(err.message, { id: toastId });
      break;
  }
};
