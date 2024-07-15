import React from 'react';
import { Link } from 'react-router-dom';

export type CatalogItemProps = {
  id: number,
  category: number,
  images: string[],
  price: number,
  title: string,
}

function Item({ id, images, price, title }: CatalogItemProps) {
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={images[0]}
             className="card-img-top img-fluid" alt={title} />
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{price.toLocaleString()} руб.</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>

  );
}

export default Item;
