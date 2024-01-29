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
            <h3 className="game-name">{game.name}</h3>
            {game.rating && (
              <div className="percent-box">
                <div className="percent" id={`progressBar${index}`} style={{ '--rating': game.rating.toFixed(2).toString() }}>
                  <svg>
                    <circle cx="40" cy="40" r="40"></circle>
                    <circle cx="40" cy="40" r="40"></circle>
                  </svg>
                  <div className="num">
                    <h2 id={`rating${index}`}>{game.rating.toFixed(1).toString()}<span>%</span></h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchPage;