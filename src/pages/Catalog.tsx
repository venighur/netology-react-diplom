import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item, { CatalogItemProps } from '../components/catalog/Item';
import Menu from '../components/catalog/Menu';
import Preloader from '../components/Preloader';

function Catalog({ withSearch }: { withSearch?: boolean }) {
  const location = useLocation();

  const [fullLoading, setFullLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [canUploadMore, setCanUploadMore] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [catalog, setCatalog] = useState<CatalogItemProps[]>([]);
  const [offsetValue, setOffsetValue] = useState(0);
  const [searchValue, setSearchValue] = useState(location.state);

  useEffect(() => {
    setFullLoading(true);
    setCanUploadMore(true);

    const url = process.env.REACT_APP_CATALOG_URL as string + (categoryId > 0 ? `?categoryId=${categoryId}` : '');
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        setCatalog(data);
        setFullLoading(false);
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  const uploadProducts = () => {
    setUploading(true);

    const category = categoryId > 0 ? `?categoryId=${categoryId}` : '';
    const offset = `${categoryId > 0 ? '&' : '?'}offset=${offsetValue + 6}`;

    fetch(process.env.REACT_APP_CATALOG_URL + category + offset)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        setCatalog(prevState => [...prevState, ...data]);
        setUploading(false);
        setOffsetValue(offsetValue + 6);
      })
      .catch((error) => console.error(error));
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {fullLoading ? <Preloader /> : (
        <>
          {withSearch && (
            <form className="catalog-search-form form-inline">
              <input
                className="form-control"
                placeholder="Поиск"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          )}
          <Menu categoryId={categoryId} setCategoryId={setCategoryId} />
          <div className="row">
            {catalog.map((item) => <Item key={item.id} {...item} />)}
          </div>
          <div className="text-center">
            {uploading
              ? <Preloader />
              : (
                canUploadMore && <button className="btn btn-outline-primary" onClick={uploadProducts}>Загрузить ещё</button>
              )
            }
          </div>
        </>
      )}
    </section>
  );
}

export default Catalog;
