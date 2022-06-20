import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const sagaMidleware = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMidleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;



const persistConfig = {
  key: 'root',
  storage,
  //blackList: ['user'],
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const composedEnhancers =  composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined, 
  composedEnhancers
);

sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);