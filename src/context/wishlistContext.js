import { createContext, useContext, useState } from "react";

const WishlistContext = createContext([]);

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const removeOfWishlist = (id) => {
    const newWishlist = wishlist.filter((product) => product.id !== id);
    setWishlist(newWishlist);
  };


  const addToWishlist = (item, qty) => {
    const element = wishlist.find((product) => product.id === item.id);

    if (!element) return setWishlist([...wishlist, { ...item, qty }]);

    const newWishlist = wishlist.map((product) => {
      if (product.id === item.id) {
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
