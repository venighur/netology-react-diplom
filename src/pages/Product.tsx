import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
// redux
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cartSlice';
// components
import { Count, Info, Sizes } from '../components/product';
import Preloader from '../components/Preloader';
// types
import { ProductProps } from '../types';

function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const addToCartHandler = () => {
    dispatch(addToCart({
      id: product.id,
      size: selectedSize,
      title: product.title,
      price: product.price,
      count,
    }));
    navigate('/cart');
  }

  return (
    <>
      <section className="catalog-item">
        {loading ? <Preloader /> : (
          <>
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
                    onClick={addToCartHandler}
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Product;
