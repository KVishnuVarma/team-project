import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import { AuthReducer } from './AuthSlice';  // Assuming your AuthSlice is here

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  Auth: AuthReducer, // Include other reducers if you have
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
