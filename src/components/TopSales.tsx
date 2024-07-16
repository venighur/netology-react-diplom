import React, { useEffect, useState } from 'react';
import { Item } from './catalog';
import { CatalogItemProps } from '../types';
import Preloader from './Preloader';
import Alert from './Alert';

function TopSales() {
  const [topSales, setTopSales] = useState<CatalogItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_TOP_SALES_URL as string)
      .then((response) => response.json())
      .then((data) => {
        setError(false);
        setShow(data.length > 0);
        setTopSales(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });

    setLoading(false);
  }, []);

  return (
    <>
      {!show ? null : (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {loading ? <Preloader /> : (
            <>
              {error && <Alert text="Ошибка при загрузке блока Хиты продаж" status="danger" />}
              <div className="row">
                {topSales.map((item) => <Item key={item.id} {...item} />)}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}

export default TopSales;
