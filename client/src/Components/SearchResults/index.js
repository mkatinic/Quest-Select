import './index.scss';
import React from 'react';

const SearchPage = ({ games }) => {
  return (
    <div className="result-page">
      {games.map((game, index) => (
        <div className="result-tile" key={index}>
          <img src={game.cover.url} alt={game.name} />
          <div className="text-info">
            <h3>{game.name}</h3>
            <p>User Rating: {game.rating.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;