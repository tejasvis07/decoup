import React from 'react';
import { useFavorites } from './FavoritesContext';
import './Favorites.css';

const Favorites = () => {
  const { getFavoritesByType, removeFavorite } = useFavorites();

  const myntraFavorites = getFavoritesByType('Myntra') || [];
  const ajioFavorites = getFavoritesByType('Ajio') || [];
  const amazonFavorites = getFavoritesByType('Amazon') || [];
  const zomatoFavorites = getFavoritesByType('Zomato') || [];

  const renderFavorites = (favorites, type) => (
    favorites.length > 0 ? (
      <div className="favorites-list">
        {favorites.map((favorite, index) => (
          <div key={index} className="favorite-card">
            <img src={favorite.image} alt={favorite.title} />
            <div className="favorite-content">
              <h3>{favorite.title}</h3>
              <p>Code: {favorite.code}</p>
              <p>Type: {type}</p>
              <button onClick={() => removeFavorite(favorite.code, type)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No {type} favorites yet!</p>
    )
  );

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      <h3>Myntra Favorites</h3>
      {renderFavorites(myntraFavorites, 'Myntra')}
      
      <h3>Ajio Favorites</h3>
      {renderFavorites(ajioFavorites, 'Ajio')}
      
      <h3>Amazon Favorites</h3>
      {renderFavorites(amazonFavorites, 'Amazon')}
      
      <h3>Zomato Favorites</h3>
      {renderFavorites(zomatoFavorites, 'Zomato')}
    </div>
  );
};

export default Favorites;
