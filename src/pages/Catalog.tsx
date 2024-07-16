import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CatalogItemProps } from '../types';
import { Item, Menu } from '../components/catalog';
import Alert from '../components/Alert';
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
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setCanUploadMore(true);
    setOffsetValue(0);
    loadProducts(true);
  }, [categoryId]);

  const loadProducts = (isFullLoading: boolean) => {
    isFullLoading ? setFullLoading(true) : setUploading(true);
    isFullLoading && setCatalog([]);

    getProducts(
      categoryId,
      searchValue,
      isFullLoading ? 0 : offsetValue + 6
    )
      .then((data) => {
        setIsError(false);
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        isFullLoading ? setCatalog(data) : setCatalog(prevState => [...prevState, ...data]);
        isFullLoading ? setFullLoading(false) : setUploading(false);
        !isFullLoading && setOffsetValue(offsetValue + 6);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        isFullLoading ? setFullLoading(false) : setUploading(false);
      });

  }

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchHandler(e);
    }
  }

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setFullLoading(true);
    setCatalog([]);

    getProducts(categoryId, searchValue, offsetValue)
      .then((data) => {
        setIsError(false);
        if (data.length < 6) {
          setCanUploadMore(false);
        }
        setCatalog(data);
        setFullLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setFullLoading(false);
      });
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
          {catalog.length === 0 && !isError && <div className="text-center">Ничего не найдено</div>}
          {isError && <Alert text="Ошибка загрузки Каталога" status="danger" />}
          <div className="text-center">
            {uploading
              ? <Preloader />
              : canUploadMore && !isError && (
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
