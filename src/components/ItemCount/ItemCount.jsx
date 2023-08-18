import { useState } from "react";
import "./ItemCount.css";

export const ItemCount = ({ stock = 0, onAdd }) => {
  const [count, setCount] = useState(1);

  const handleSum = () => {
    setCount(Math.min(stock, count + 1));
  };

  const handleSub = () => {
    setCount(Math.max(1, count - 1));
  };

  return (
    <div className="item-count">
      {stock ? (
        <>
          <div className="item-count__buttons">
            <button
              onClick={() => {
                handleSub();
              }}
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={() => {
                handleSum();
              }}
            >
              +
            </button>
          </div>
          <button
            className="item-count__add"
            disabled={!stock}
            onClick={() => {
              onAdd(count);
              setCount(1);
            }}
          >
            Agregar a carrito
          </button>
        </>
      ) : (
        <h5>Tienes todo el carrito</h5>
      )}
    </div>
  );
};
