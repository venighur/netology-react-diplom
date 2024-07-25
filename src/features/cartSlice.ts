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
      if (state.products.find((product) => product.id === action.payload.id && product.size === action.payload.size)) {
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id && product.size === action.payload.size) {
            product.count += 1;
          }
          return product;
        });
      } else {
        state.products.push(action.payload);
        state.count += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
      state.count -= 1;
    },
    clearCart: (state) => {
      state.products = [];
      state.count = 0;
    },
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCount = (state: RootState) => state.cart.count;
export const selectProducts = (state: RootState) => state.cart.products;
export default cartSlice.reducer;
