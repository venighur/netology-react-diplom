import React from 'react';
import { Link } from 'react-router-dom';
import { ProductInCartProps } from '../types';

export function CartItem({ product }: { product: ProductInCartProps }) {
  console.log(product);
  return (
    <tr>
      <td scope="row">{product.id}</td>
      <td><Link to="/catalog/1">{product.title}</Link></td>
      <td>{product.size}</td>
      <td>{product.count}</td>
      <td>{product.price.toLocaleString()} руб.</td>
      <td>{(product.count * product.price).toLocaleString()} руб.</td>
      <td>
        <button className="btn btn-outline-danger btn-sm">Удалить</button>
      </td>
    </tr>
  );
}
