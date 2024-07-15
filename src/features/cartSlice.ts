import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ProductInCartProps } from '../types';

export interface CartState {
  count: number;
  products: ProductInCartProps[];
}

const initialState: CartState = {
  count: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')!).length : 0,
  products: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')!) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductInCartProps>) => {
      state.products?.push(action.payload);
      state.count += 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products?.filter((product) => product.id !== action.payload);
      state.count -= 1;
    },
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCount = (state: RootState) => state.cart.count;
export const selectProducts = (state: RootState) => state.cart.products;
export default cartSlice.reducer;
