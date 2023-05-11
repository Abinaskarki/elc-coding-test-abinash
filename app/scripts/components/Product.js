import React from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product-picture-container">
        <img
          src={product.picture}
          alt={product.name}
          className="product-picture"
        />
      </div>
      <div className="product-details">
        <h2 className="product-name">
          <a className="product-anchor" href="#">
            {product.name}
          </a>
        </h2>
        <p className="product-about">{product.about}</p>
        <ul className="product-tags">
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="product-price-container">
          <div className="product-price">${product.price}</div>
          <div className="product-status">
            {product.isActive ? "In stock" : "Out of stock"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
