import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
        let base_url = "https://inventory-backend-g6ph.onrender.com";

    fetch(`${base_url}/auth/wishlist`, {
      headers: { Authorization: token }
    })
      .then((res) => res.json())
      .then(setWishlist);
  }, [token]);

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlist.map(p => (
          <li key={p._id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
