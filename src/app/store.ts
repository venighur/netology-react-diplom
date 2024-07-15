import { configureStore, ThunkAction, Action, createListenerMiddleware } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart } from '../features/cartSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addToCart,
  effect: (action, listenerApi: any) => {
    const { products } = listenerApi.getState().cart;
    localStorage.setItem('products', JSON.stringify(products));
  }
});

listenerMiddleware.startListening({
  actionCreator: removeFromCart,
  effect: (action, listenerApi: any) => {
    const { products } = listenerApi.getState().cart;
    localStorage.setItem('products', JSON.stringify(products));
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
