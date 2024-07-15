import React from 'react';
import Catalog from './Catalog';
import TopSales from '../components/TopSales';

function Home() {
  //const topSalesCount = useAppSelector((state) => state.topSales.count);

  return (
    <>
      {/*topSalesCount > 0 && */<TopSales />}
      <Catalog />
    </>
  );
}

export default Home;
