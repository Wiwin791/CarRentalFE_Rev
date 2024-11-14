import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import reactotron from '../../ReactotronConfig';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
=======
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
<<<<<<< HEAD
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  enhancers: (getDefaultEnhancers) =>
    __DEV__ ? getDefaultEnhancers()
      .concat(reactotron.createEnhancer()) : getDefaultEnhancers(),
  devTools: true,
});

export const persistor = persistStore(store);
=======
});

export const persistor = persistStore(store);
>>>>>>> d18b6d755eae2cc70838571d4a737c681a27ef41
