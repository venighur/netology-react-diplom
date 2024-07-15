import { configureStore, ThunkAction, Action, createListenerMiddleware } from '@reduxjs/toolkit';
import cartReducer, { addToCart } from '../features/cartSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: addToCart,
  effect: (action, listenerApi) => {
    const products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')!) : [];
    localStorage.setItem('products', JSON.stringify([...products, action.payload]));
  }
})

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
