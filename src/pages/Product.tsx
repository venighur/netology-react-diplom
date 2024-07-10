import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { incCartCount, decCartCount } from '../features/cartSlice';
import Preloader from '../components/Preloader';
import { ProductProps } from '../types';
import { Count, Info, Sizes } from '../components/product';

function Product() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({} as ProductProps);

  useEffect(() => {
    fetch(process.env.REACT_APP_CATALOG_URL + `/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const clickHandler = () => {
    const productToAdd = {
      id: product.id,
      size: selectedSize,
      title: product.title,
      price: product.price,
      count,
    }
    localStorage.setItem(product.id.toString(), JSON.stringify(productToAdd));
    dispatch(incCartCount())
  }

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <section className="catalog-item">
          <h2 className="text-center">{product.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={product.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <Info product={product}/>
              <div className="text-center">
                <Sizes
                  sizes={product.sizes.filter((s) => s.available)}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                {product.sizes.some((s) => s.available) && <Count count={count} setCount={setCount} />}
              </div>
              {product.sizes.some((s) => s.available) && (
                <button
                  className="btn btn-danger btn-block btn-lg"
                  disabled={!selectedSize}
                  onClick={clickHandler}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Product;
