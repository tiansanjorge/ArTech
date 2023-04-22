import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  const removeProduct = (id, color) => {
    const newCart = cart.filter((product) => product.id !== id || product.color !== color );
    setCart(newCart);
  };

  // agregamos un producto
  const addProduct = (item, qty, color) => {

    // verificamos si el producto ya existe dentro del carrito
    const element = cart.find((product) => product.id === item.id && product.color === color );

    // si no existe dentro del carrito, lo agregamos. Sobrescribiendo el carrito con todo lo que ya tenía + el nuevo producto
    if (!element) return setCart([...cart, { ...item, qty, color }]);
    
    // si el producto a agregar ya existia dentro del carrito, solo agregamos la nueva cantidad a la cantidad anterior (qty)
    const newCart = cart.map((product) => {
      if (product.id === item.id && product.color === color ){
        return { ...product, qty: product.qty + qty };
      } 
      return product
    });
    setCart(newCart);
    
  };


  const getTotal = () => cart.reduce((acc, product) => acc + product.valor * product.qty , 0)

  const getCartQty = () => cart.reduce((acc, product) => acc + product.qty , 0);
  
  const emptyCart = () => setCart([])

  const value = {
    cart,
    addProduct,
    removeProduct,
    getCartQty,
    getTotal,
    emptyCart
  };

  return <CartContext.Provider value={value} displayName="cartContext">{children}</CartContext.Provider>;
};
