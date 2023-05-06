import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(false);

  // Guardo en el LocalStorage el array "cart" y el estado de "discount"
  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  });

  useEffect(() => {
    const data = localStorage.getItem("discount");
    if (data) {
      setDiscount(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("discount", JSON.stringify(discount));
  });

  // uso un useEffect para alternar el estado "discount" cada vez que el cart sufre una modificacion
  useEffect(() => {
    const newCart = cart.filter((product) => product.qty >= 3);
    if (newCart.length > 0) {
      setDiscount(true);
    }
    else {
      setDiscount(false)
    }
  }, [cart]);

  // removemos un producto
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

  const discountApplier = () => {
    const newCart = cart.filter((product) => product.qty >= 3 );
    if(newCart.length>0){
      let discount = 0 
      newCart.forEach((product) => {
      discount = discount + product.valor * 0.25;})
    return discount
    }
    return 0
  }

  const getTotal = () => cart.reduce((acc, product) => acc + product.valor * product.qty , 0) - discountApplier()

  const getCartQty = () => cart.reduce((acc, product) => acc + product.qty , 0);
  
  const emptyCart = () => setCart([])

  const value = {
    cart,
    discount,
    addProduct,
    removeProduct,
    getCartQty,
    getTotal,
    emptyCart
  };

  return <CartContext.Provider value={value} displayName="cartContext">{children}</CartContext.Provider>;
};
