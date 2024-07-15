import React from 'react';
import { useAppSelector } from '../app/hooks';
import { selectProducts } from '../features/cartSlice';
import { OrderForm, ProductsList } from '../components/cart';

function Cart() {
  const products = useAppSelector(selectProducts);

  return (
    <>
      <ProductsList products={products} />
      <OrderForm />
    </>
  );
}

export default Cart;
