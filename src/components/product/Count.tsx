import React from 'react';

type CountProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export function Count({ count, setCount }: CountProps) {
  const increment = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <p>Количество:
      <span className="btn-group btn-group-sm pl-2">
        <button className={`btn btn-secondary ${count === 1 ? 'disabled' : ''}`} onClick={decrement}>-</button>
        <span className="btn btn-outline-primary">{count}</span>
        <button className={`btn btn-secondary ${count === 10 ? 'disabled' : ''}`} onClick={increment}>+</button>
      </span>
    </p>
  );
}