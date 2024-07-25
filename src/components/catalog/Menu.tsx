import React from 'react';

type CatalogMenuProps = {
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function Menu({ categoryId, setCategoryId }: CatalogMenuProps) {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item" onClick={() => setCategoryId(null)}>
        <span className={`nav-link ${!categoryId ? 'active' : ''}`}>Все</span>
      </li>
      <li className="nav-item" onClick={() => setCategoryId(13)}>
        <span className={`nav-link ${categoryId === 13 ? 'active' : ''}`}>Женская обувь</span>
      </li>
      <li className="nav-item" onClick={() => setCategoryId(12)}>
        <span className={`nav-link ${categoryId === 12 ? 'active' : ''}`}>Мужская обувь</span>
      </li>
      <li className="nav-item" onClick={() => setCategoryId(14)}>
        <span className={`nav-link ${categoryId === 14 ? 'active' : ''}`}>Обувь унисекс</span>
      </li>
      <li className="nav-item" onClick={() => setCategoryId(15)}>
        <span className={`nav-link ${categoryId === 15 ? 'active' : ''}`}>Детская обувь</span>
      </li>
    </ul>
  );
}
