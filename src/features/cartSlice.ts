import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { ProductInCartProps } from '../types';

export interface CartState {
  count: number;
  products?: ProductInCartProps[]
}

const initialState: CartState = {
  count: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductInCartProps>) => {
      state.products?.push(action.payload);
      state.count += 1;
    },
    removeFromCart: (state, payload: PayloadAction<ProductInCartProps>) => {
      state.products = state.products?.filter((product) => product.id !== payload.payload.id);
      state.count -= 1;
    },
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCount = (state: RootState) => state.cart.count;
export const selectProducts = (state: RootState) => state.cart.products;
export default cartSlice.reducer;
