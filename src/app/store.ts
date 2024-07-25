import { configureStore, ThunkAction, Action, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import cartReducer, { addToCart, clearCart, removeFromCart } from '../features/cartSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, removeFromCart, clearCart),
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
