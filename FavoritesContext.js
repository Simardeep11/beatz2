import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (song) => {
    if (!favorites.some(f => f.id === song.id)) {
      setFavorites([...favorites, song]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(song => song.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
