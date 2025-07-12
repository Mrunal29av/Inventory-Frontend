import React, { useEffect, useState } from 'react';
import './Products.css';
import { useAuth } from '../AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    fetch('http://localhost:5009/api/products', {
      headers: { Authorization: token }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-container">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
