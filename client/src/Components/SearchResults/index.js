import './index.scss';
import React from 'react';

const SearchPage = ({games}) => {
    return (
        <div className="result-page">
          {games.map((game, index) => (
            <div className="result-tile" key={index}>
              <img src={game.artworks} alt={game.name} />
              <h3>{game.name}</h3>
              <p>User Rating: {game.rating}</p>
              <p>User: {}</p>
            </div>
          ))}
        </div>
      );
}

export default SearchPage;