import React, { useState } from "react";

const initialProducts = [
  {
    id: 0,
    name: "Baklava",
    count: 1,
  },
  {
    id: 1,
    name: "Cheese",
    count: 5,
  },
  {
    id: 2,
    name: "Spaghetti",
    count: 2,
  },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId) {
    const myProducts = [...products];
    const change = myProducts.find((e) => e.id === productId);
    change.count += 1;
    setProducts(myProducts);
  }
  function handleDecreaseClick(productId) {
    const myProducts = [...products];
    const change = myProducts.find((e) => e.id === productId);
    if (change.count === 1) {
      setProducts(myProducts.filter((e) => e !== change));
    } else {
      change.count -= 1;
      setProducts(myProducts);
    }
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (<b>{product.count}</b>)
          <button
            type="button"
            onClick={() => {
              handleIncreaseClick(product.id);
            }}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              handleDecreaseClick(product.id);
            }}
          >
            –
          </button>
        </li>
      ))}
    </ul>
  );
}
