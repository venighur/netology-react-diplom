import React, { useEffect, useState } from 'react';
import { Item } from './catalog';
import { CatalogItemProps } from '../types';
import Preloader from './Preloader';

function TopSales() {
  const [topSales, setTopSales] = useState<CatalogItemProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_TOP_SALES_URL as string)
      .then((response) => response.json())
      .then((data) => {
        setTopSales(data);
      })
      .catch((error) => console.error(error));

    setLoading(false);
  }, []);

  return (
    <>
      {!loading && topSales.length === 0 ? null : (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {loading ? <Preloader /> : (
            <div className="row">
              {topSales.map((item) => <Item key={item.id} {...item} />)}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default TopSales;
