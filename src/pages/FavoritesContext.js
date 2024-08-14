import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState({
    Myntra: [],
    Ajio: [],
    Amazon: [],
    Zomato: [],
  });

  const addFavorite = (favorite, type) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [type]: [...prevFavorites[type], favorite],
    }));
  };

  const removeFavorite = (code, type) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [type]: prevFavorites[type].filter(fav => fav.code !== code),
    }));
  };

  const getFavoritesByType = (type) => favorites[type];

  return (
    <FavoritesContext.Provider value={{ addFavorite, removeFavorite, getFavoritesByType }}>
      {children}
    </FavoritesContext.Provider>
  );
};
