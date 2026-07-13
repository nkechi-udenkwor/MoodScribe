import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position='top-right'
          richColors
          closeButton
          duration={5000}
          toastOptions={{
            style: { height: '64px' },
          }}
        />

        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
