import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shippingAddress, setShippingAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('shippingAddress');
      return saved
        ? JSON.parse(saved)
        : {
            fullName: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'India',
          };
    } catch {
      return {
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
      };
    }
  });

  const [paymentMethod, setPaymentMethod] = useState(() => {
    return localStorage.getItem('paymentMethod') || 'Cash on Delivery';
  });

  // Sync cart items to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync shipping address
  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  }, [shippingAddress]);

  // Sync payment method
  useEffect(() => {
    localStorage.setItem('paymentMethod', paymentMethod);
  }, [paymentMethod]);

  // Add to cart with stock validation
  const addToCart = (product, qty = 1) => {
    // Require login before adding anything to the cart
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return {
        success: false,
        requiresLogin: true,
        message: 'Please login to add items to your cart.',
      };
    }

    const quantity = Number(qty);
    const existingIndex = cartItems.findIndex((item) => item.product === product._id);

    // Compute final discounted price
    const finalPrice =
      product.discount > 0
        ? Math.round(product.price * (1 - product.discount / 100))
        : product.price;

    if (existingIndex > -1) {
      const existing = cartItems[existingIndex];
      const newQuantity = existing.quantity + quantity;

      if (newQuantity > product.stock) {
        return {
          success: false,
          message: `Cannot add more. Only ${product.stock} units available in stock.`,
        };
      }

      const updated = [...cartItems];
      updated[existingIndex] = { ...existing, quantity: newQuantity };
      setCartItems(updated);
      return { success: true, message: 'Cart updated successfully!' };
    } else {
      if (quantity > product.stock) {
        return {
          success: false,
          message: `Only ${product.stock} units available in stock.`,
        };
      }

      setCartItems([
        ...cartItems,
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: finalPrice,
          originalPrice: product.price,
          discount: product.discount || 0,
          brand: product.brand,
          dosage: product.dosage,
          stock: product.stock,
          quantity,
        },
      ]);
      return { success: true, message: 'Added to cart successfully!' };
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.product !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, newQty) => {
    const qty = Number(newQty);
    if (qty <= 0) {
      removeFromCart(productId);
      return { success: true };
    }

    const item = cartItems.find((i) => i.product === productId);
    if (item && qty > item.stock) {
      return {
        success: false,
        message: `Maximum available stock is ${item.stock}`,
      };
    }

    setCartItems(
      cartItems.map((item) =>
        item.product === productId ? { ...item, quantity: qty } : item
      )
    );
    return { success: true };
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  // Cart calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Free delivery above ₹500, else ₹40
  const shippingPrice = itemsPrice > 500 || itemsPrice === 0 ? 0 : 40;
  // 5% Healthcare GST
  const taxPrice = Math.round(itemsPrice * 0.05);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        shippingAddress,
        setShippingAddress,
        paymentMethod,
        setPaymentMethod,
        itemsCount,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
