import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Item, { CatalogItemProps } from '../components/catalog/Item';
import Menu from '../components/catalog/Menu';
import Preloader from '../components/Preloader';
import { getProducts } from '../api';

function Catalog({ withSearch }: { withSearch?: boolean }) {
  const location = useLocation();

  const [fullLoading, setFullLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [canUploadMore, setCanUploadMore] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [catalog, setCatalog] = useState<CatalogItemProps[]>([]);
  const [offsetValue, setOffsetValue] = useState(0);
  const [searchValue, setSearchValue] = useState(location.state || '');

  useEffect(() => {
    setCanUploadMore(true);
    setOffsetValue(0);
    loadProducts(true);
  }, [categoryId]);

  const loadProducts = (isFullLoading: boolean) => {
    isFullLoading ? setFullLoading(true) : setUploading(true);

    getProducts(
      categoryId,
      searchValue,
      isFullLoading ? 0 : offsetValue + 6
    )
      .then((data) => {
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        isFullLoading ? setCatalog(data) : setCatalog(prevState => [...prevState, ...data]);
        isFullLoading ? setFullLoading(false) : setUploading(false);
        !isFullLoading && setOffsetValue(offsetValue + 6);
      })
      .catch((error) => console.error(error));
  }

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchHandler(e);
    }
  }

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setFullLoading(true);

    getProducts(categoryId, searchValue, offsetValue)
      .then((data) => {
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        setCatalog(data);
        setFullLoading(false);
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
                onKeyPress={keyPressHandler}
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
              : canUploadMore && (
                  <button className="btn btn-outline-primary" onClick={() => loadProducts(false)}>Загрузить ещё</button>
                )
            }
          </div>
        </>
      )}
    </section>
  );
}

export default Catalog;
