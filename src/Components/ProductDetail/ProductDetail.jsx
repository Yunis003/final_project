import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import "./productdetail.css";
import ClipLoader from "react-spinners/ClipLoader";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  const handleAddToFavorite3 = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Product added to favorites!");
  };

  if (loading) {
    return (
      <div className="loading">
        <ClipLoader color="#36d7b7" size={50} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {product ? (
        <>
          <div className="product-image-section">
            <img
              src={product.images[0] || "https://i.imgur.com/4lTaHfF.jpeg"}
              alt={product.title}
              className="product-detail-image"
            />
          </div>
          <div className="product-info-section">
            <h1>{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${product.price}</p>
            <button className="add-to-favorite-btn" onClick={handleAddToFavorite3}>
              Add to Favorites
            </button>
            <NavLink to="/" className="back-to-sales">
              Back to Flash Sales
            </NavLink>
          </div>
        </>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
