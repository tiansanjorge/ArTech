import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext([]);

export const useFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  const removeOfFavorites = (id, color) => {
    const newFavorites = favorites.filter((product) => product.id !== id || product.color !== color );
    setFavorites(newFavorites);
  };


  const addToFavorites = (item, qty, color) => {
    const element = favorites.find((product) => product.id === item.id && product.color === color );

    if (!element) return setFavorites([...favorites, { ...item, qty, color }]);

    const newFavorites = favorites.map((product) => {
      if (product.id === item.id && product.color === color ) {
        return { ...product, qty: product.qty + qty };
      }
      return product;
    });
    setFavorites(newFavorites);
  };

  const getTotal = () => favorites.reduce((acc, product) => acc + product.valor * product.qty , 0);

  const getFavoritesQty = () => favorites.reduce((acc,product) => acc + product.qty , 0);
  
  const emptyFavorites = () => setFavorites([])

  const value = {
    favorites,
    addToFavorites,
    removeOfFavorites,
    getFavoritesQty,
    getTotal,
    emptyFavorites
  };

  return <FavoritesContext.Provider value={value} displayName="favoritesContext">{children}</FavoritesContext.Provider>;
};
