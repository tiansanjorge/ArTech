import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext([]);

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("wishlist");
    if (data) {
      setWishlist(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  });

  const removeOfWishlist = (id, color) => {
    const newWishlist = wishlist.filter((product) => product.id !== id || product.color !== color );
    setWishlist(newWishlist);
  };


  const addToWishlist = (item, qty, color) => {
    const element = wishlist.find((product) => product.id === item.id && product.color === color );

    if (!element) return setWishlist([...wishlist, { ...item, qty, color }]);

    const newWishlist = wishlist.map((product) => {
      if (product.id === item.id && product.color === color ) {
        return { ...product, qty: product.qty + qty };
      }
      return product;
    });
    setWishlist(newWishlist);
  };

  const getTotal = () => wishlist.reduce((acc, product) => acc + product.valor * product.qty , 0)

  const getWishlistQty = () => wishlist.reduce((acc,product) => acc + product.qty , 0);
  
  const emptyWishlist = () => setWishlist([])

  const value = {
    wishlist,
    addToWishlist,
    removeOfWishlist,
    getWishlistQty,
    getTotal,
    emptyWishlist
  };

  return <WishlistContext.Provider value={value} displayName="wishlistContext">{children}</WishlistContext.Provider>;
};
