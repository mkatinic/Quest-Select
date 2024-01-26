import './index.scss';
import React from 'react';

const SearchPage = ({ games }) => {
  console.log(games);
  return (
    <div className="result-page">
      {games.map((game, index) => (
        <div className="result-tile" key={index}>
          {game.cover && game.cover.image_id && (
            <img src={`https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`} alt={game.name} />
          )}
          <div className="text-info">
            <h3>{game.name}</h3>
            {game.rating && (
              <p className="rating">User Rating: {game.rating.toFixed(2)}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;