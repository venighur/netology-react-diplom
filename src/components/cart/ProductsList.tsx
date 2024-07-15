import React from 'react';
import { Item } from './Item';
import { ProductInCartProps } from '../../types';

export function ProductsList({ products }: { products: ProductInCartProps[] }) {
  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
        </thead>
        <tbody>
        {products?.map((p) => <Item key={p.id} product={p} />)}
        <tr>
          <td colSpan={5} className="text-right">Общая стоимость</td>
          <td>{products?.reduce((acc, p) => acc + p.price * p.count, 0).toLocaleString()} руб.</td>
        </tr>
        </tbody>
      </table>
    </section>
  );
}