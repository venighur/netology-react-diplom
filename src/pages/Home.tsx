import React, { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';
import CatalogItem, { CatalogItemProps } from '../components/CatalogItem';
import CatalogMenu from '../components/CatalogMenu';

function Home() {
  const [topSalesLoading, setTopSalesLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [topSales, setTopSales] = useState([] as CatalogItemProps[]);
  const [catalog, setCatalog] = useState([] as CatalogItemProps[]);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_TOP_SALES_URL as string)
      .then((response) => response.json())
      .then((data) => {
        setTopSales(data);
        setTopSalesLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const url = process.env.REACT_APP_CATALOG_URL as string + (categoryId > 0 ? `?categoryId=${categoryId}` : '');

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCatalog(data);
        setCatalogLoading(false);
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {topSalesLoading && <Preloader />}
        <div className="row">
          {!topSalesLoading && topSales.map((item) => <CatalogItem key={item.id} {...item} />)}
        </div>
      </section>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {catalogLoading && <Preloader />}
        {!catalogLoading && (
          <>
            <CatalogMenu categoryId={categoryId} setCategoryId={setCategoryId} />
            <div className="row">
              {catalog.map((item) => <CatalogItem key={item.id} {...item} />)}
            </div>
            <div className="text-center">
              <button className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
          </>
        )}
      </section>
    </>

  );
}

export default Home;
