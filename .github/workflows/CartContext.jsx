import {
  createContext,
  useContext,
  useState
} from "react";


const CartContext = createContext();


export function CartProvider({ children }) {

  // ==========================================
  // Cart State
  // ==========================================

  const [cart, setCart] = useState([]);


  // ==========================================
  // Add Product To Cart
  // ==========================================

  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );


    if (existingProduct) {

      // Product already exists
      // Increase quantity

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      );

    } else {

      // New product

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };


  // ==========================================
  // Increase Quantity
  // ==========================================

  const increaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decreaseQuantity = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };


  // ==========================================
  // Remove Product
  // ==========================================

  const removeFromCart = (id) => {

    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );

  };


  // ==========================================
  // Clear Cart
  // ==========================================

  const clearCart = () => {

    setCart([]);

  };


  // ==========================================
  // Provider
  // ==========================================

  return (

    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

}


// ==========================================
// useCart Hook
// ==========================================

export function useCart() {

  return useContext(CartContext);

}