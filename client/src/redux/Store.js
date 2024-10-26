import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { AuthReducer } from './AuthSlice';

const persistConfig = {
  key: 'root',
  storage,
  // You can also specify the version of the persisted state
};

const rootReducer = combineReducers({
  Auth: AuthReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths or actions if needed
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Add other actions if necessary
        ignoredPaths: ['register'], // Specify non-serializable paths if necessary
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
