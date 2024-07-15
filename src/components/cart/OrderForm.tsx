import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCart, selectProducts } from '../../features/cartSlice';
import Preloader from '../Preloader';

export function OrderForm() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    address: '',
    agreement: false,
  });

  const products = useAppSelector(selectProducts);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    fetch('http://localhost:7070/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owner: {
          phone: form.phone,
          address: form.address,
        },
        items: products.map((p) => ({
          id: p.id,
          price: p.price,
          count: p.count,
        }))
      }),
    })
      .then(() => {
        dispatch(clearCart());
        alert('Заказ оформлен!');
      })
      .catch(() => alert('Что-то пошло не так!'));

    setLoading(false);
    setForm({
      phone: '',
      address: '',
      agreement: false,
    });
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      {loading ? <Preloader /> : (
        <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
          <form className="card-body" onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
                value={form.phone}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
                value={form.address}
                onChange={changeHandler}
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreement"
                checked={form.agreement}
                onChange={() => setForm((prevState) => ({ ...prevState, agreement: !form.agreement }))}
              />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      )}
    </section>
  );
}