import './index.scss';
import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults';

const GameSearch = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tileOptions, setTileOptions] = useState({});
  const [games, setGames] = useState([]);

  const getOptionsForTile = (tile) => {
    switch (tile) {
      case 'Platform':
        return ['PC (Microsoft Windows)', 'Xbox Series S|X', 'PlayStation 5', 'Xbox One', 'Playstation 4', 'Xbox 360', 'Playstation 3', 'Nintendo Switch'];
      case 'Genre':
        return ['Role-playing (RPG)', 'Shooter', 'Indie', 'Platform', 'Point-and-click', 'Real Time Strategy (RTS)', 'Simulator', 'Sports', 'Arcade', 'Adventure', 'Racing'];
      case 'Minimum Rating':
        return ['10', '20', '30', '40', '50', '60', '70', '80', '90'];
      case 'Minimum Year':
        return ['1990', '1995', '2000', '2005', '2010', '2015', '2020'];
      case 'Mode':
        return ['Single Player', 'Multiplayer', 'MMO', 'Co-op', 'Split screen'];
      case 'Theme':
        return ['Fantasy', 'Thriller', 'Horror', 'Survival', 'Action', 'Stealth', 'Open World'];
      default:
        return [];
    }
  };

  const handleTileClick = (tile) => {
    setSelectedTile(tile);
    const optionsForTile = getOptionsForTile(tile);
    setTileOptions({ ...tileOptions, [tile]: optionsForTile });
  };

  const handleOptionClick = (tile, option) => {
    const isOptionSelected = selectedOptions.some(([existingTileValue, existingOption]) => existingTileValue === tile);
    if (!isOptionSelected) {
      setSelectedOptions([...selectedOptions, [tile, option]]);
    }
  };

  const handleOptionRemove = (removedTile) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((option) => option[1] !== removedTile[1])
    );
  
    setTileOptions((prevTileOptions) => ({
      ...prevTileOptions,
      [removedTile[1]]: getOptionsForTile(removedTile[1]),
    }));
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/searchGames', { selectedOptions });
      
      const gameData = response.data;
      setGames(gameData);
      console.log('List of Games:', gameData);
    } catch (error) {
      console.error('Error searching for games:', error.message);
    }
  };

  return (
    <>
    <div className="gamesearch-page">
      <div className="header">
        <div className="buttons">
          <button onClick={handleSearchClick}>Search</button>
        </div>
      </div>

      <div className="content">
        <div className="tiles">
          {['Platform', 'Genre',  /*'Mode',*/ 'Theme', 'Minimum Rating', 'Minimum Year'].map((tile) => (
            <div
              key={tile}
              className={`tile ${selectedTile === tile ? 'selected' : ''}`}
              onClick={() => handleTileClick(tile)}
            >
              {tile}
            </div>
          ))}
        </div>
      </div>

      <div className="options">
        {selectedTile && (
          <div className="tile-options">
            {tileOptions[selectedTile] &&
              tileOptions[selectedTile].map((option, index) => (
                <div key={index} onClick={() => handleOptionClick(selectedTile, option)}>
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="selected-options">
        <ul>
          {selectedOptions.map(([tile, option], index) => (
            <li key={index} onClick={() => handleOptionRemove([tile, option])}>{option}</li>
          ))}
        </ul>
      </div>
    </div>

    <div className="result-page">
      <SearchResults games={games} />
    </div>
    </>
  );
};

export default GameSearch;



