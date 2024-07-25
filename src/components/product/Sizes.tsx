import React from 'react';
import { ProductSizeProps } from '../../types';

type SizesProps = {
  sizes: ProductSizeProps[];
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
};

export function Sizes({ sizes, selectedSize, setSelectedSize }: SizesProps) {
  return (
    <>
      {sizes.length > 0 && (
        <p>Размеры в наличии: {sizes.map((s) => (
          <span
            key={s.size}
            className={`catalog-item-size ${selectedSize === (s.size) ? ' selected' : ''}`}
            onClick={() => setSelectedSize(selectedSize === s.size ? '' : s.size)}>
            {s.size}
          </span>
        ))}</p>
      )}
    </>
  );
}