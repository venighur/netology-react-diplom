import { configureStore, ThunkAction, Action, createListenerMiddleware } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart } from '../features/cartSlice';
import {ProductInCartProps} from '../types';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addToCart,
  effect: (action, listenerApi) => {
    const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')!) : [];
    localStorage.setItem('products', JSON.stringify([...products, action.payload]));
  }
});

listenerMiddleware.startListening({
  actionCreator: removeFromCart,
  effect: (action, listenerApi) => {
    const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')!) : [];
    localStorage.setItem('products', JSON.stringify(products.filter((product: ProductInCartProps) => product.id !== action.payload)));
  }
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
