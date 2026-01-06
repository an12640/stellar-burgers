import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice, ingredientSlice, constructorSlice, orderSlice } from '@slices';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  ingredient: ingredientSlice.reducer,
  constructorItems: constructorSlice.reducer,
  order: orderSlice.reducer,

});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
