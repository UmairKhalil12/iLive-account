import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'persist-store',
    storage
}

const reducer = combineReducers({
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer
})