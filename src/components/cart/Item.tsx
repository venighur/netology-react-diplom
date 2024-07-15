import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { removeFromCart } from '../../features/cartSlice';
import { ProductInCartProps } from '../../types';

export function Item({ product }: { product: ProductInCartProps }) {
  const dispatch = useAppDispatch();

  return (
    <tr>
      <td scope="row">{product.id}</td>
      <td><Link to={`/catalog/${product.id}`}>{product.title}</Link></td>
      <td>{product.size}</td>
      <td>{product.count}</td>
      <td>{product.price.toLocaleString()} руб.</td>
      <td>{(product.count * product.price).toLocaleString()} руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(removeFromCart(product.id))}>
          Удалить
        </button>
      </td>
    </tr>
  );
}
