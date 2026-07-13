import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  deleteQuoteReducer,
  quoteReducer,
  quotesReducer,
} from '../redux/quotes/features';
import { signinReducer, signupReducer, userReducer } from './auth/features';
import tokenExpirationMiddleware from '../utils/tokenExpirationMiddleware';
import { journalsReducer, addJournalReducer } from './journals/features';
import { articlesReducer, articlesSearchReducer } from './articles/features';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  signup: signupReducer,
  signin: signinReducer,
  user: userReducer,
  quotes: quotesReducer,
  quote: quoteReducer,
  deleteQuote: deleteQuoteReducer,
  journal: addJournalReducer,
  journals: journalsReducer,
  articles: articlesReducer,
  articlesSearch: articlesSearchReducer,
});

// storage.removeItem('persist:root');

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(tokenExpirationMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
