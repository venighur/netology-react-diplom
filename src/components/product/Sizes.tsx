import React from 'react';
import { ProductSizeProps } from '../../types';

type SizesProps = {
  sizes: ProductSizeProps[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
};

export function Sizes({ sizes, selectedSize, setSelectedSize }: SizesProps) {
  const clickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const span = e.target as HTMLSpanElement;
    setSelectedSize(selectedSize === span.innerText ? '' : span.innerText);
  }

  return (
    <>
      {sizes.length > 0 && (
        <p>Размеры в наличии: {sizes.map((s) => (
          <span
            key={s.size}
            className={`catalog-item-size ${selectedSize === (s.size) ? ' selected' : ''}`}
            onClick={clickHandler}>
            {s.size}
          </span>
        ))}</p>
      )}
    </>
  );
}