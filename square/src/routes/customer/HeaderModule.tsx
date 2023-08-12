import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const HeaderModule: React.FC = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cartData = localStorage.getItem('cart');
      const cartObj = cartData ? JSON.parse(cartData) : {};

      let totalItemCount = 0;

      Object.values(cartObj).forEach((store: any) => {
        Object.values(store).forEach((quantity: unknown) => {
          totalItemCount += quantity as number;
        });
      });

      console.log(totalItemCount)
      setCartItemCount(totalItemCount);
    };

    updateCart();

    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        updateCart();
      }
    });

    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      width: '100%', 
      position: 'absolute', 
      top: 0, 
      padding: '10px' 
    }}>
      <ArrowBackIcon  onClick={() => navigate(-1)} />
      <Link to="/cart">
        <Badge 
          badgeContent={cartItemCount} 
          color="primary"
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
      <ShoppingCartIcon  />
        </Badge>
      </Link>
    </div>
  );
};

export default HeaderModule;
