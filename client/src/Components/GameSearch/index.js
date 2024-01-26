/*
TODO:

Make min rating and year slider

*/

import './index.scss';
import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from '../SearchResults';

const GameSearch = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tileOptions, setTileOptions] = useState({});
  const [games, setGames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const getOptionsForTile = (tile) => {
    switch (tile) {
      case 'Platform':
        return ['PC (Microsoft Windows)', 'Xbox Series S|X', 'PlayStation 5', 'Xbox One', 'Playstation 4', 'Xbox 360', 'Playstation 3', 'Nintendo Switch'];
      case 'Genre':
        return ['Role-playing (RPG)', 'Shooter', 'Indie', 'Platform', 'Point-and-click', 'Real Time Strategy (RTS)', 'Simulator', 'Sports', 'Arcade', 'Adventure', 'Racing'];
      case 'Minimum Rating':
        return ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60', '65', '70', '75', '80', '85', '90', '95'].reverse();
      case 'Minimum Year':
        return ['1990', '1992', '1994', '1996', '1998', '2000', '2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'].reverse();
      case 'Mode':
        return ['Single Player', 'Multiplayer', 'MMO', 'Co-op', 'Split screen'];
      case 'Theme':
        return ['Fantasy', 'Thriller', 'Horror', 'Survival', 'Action', 'Stealth', 'Open world', 'Sandbox', 'Warfare'];
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
    setSelectedOptions((prevSelectedOptions) => {
      const isOptionSelected = prevSelectedOptions.some(
        ([existingTileValue, existingOption]) => existingTileValue === tile
      );
      return isOptionSelected
        ? prevSelectedOptions.map((prevOption) =>
          prevOption[0] === tile ? [tile, option] : prevOption
        )
        : [...prevSelectedOptions, [tile, option]];
    });
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
      const response = await axios.post('http://localhost:3001/api/searchGames', {
        selectedOptions,
        offset: 0,
      });

      const gameData = response.data;
      setGames(gameData);
      setHasSearched(true);
      console.log('List of Games:', gameData);
    } catch (error) {
      console.error('Error searching for games:', error.message);
    }
  };

  const loadMoreGames = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/searchGames', {
        selectedOptions,
        offset: offset + 10,
      });

      const newGameData = response.data;
      setGames((prevGames) => [...prevGames, ...newGameData]);
      setOffset(offset + 10);
      console.log('List of Games:', games);
    } catch (error) {
      console.error('Error loading more games:', error.message);
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
          <div className="tiles-container">
            {['Platform', 'Genre', 'Theme', 'Minimum Rating', 'Minimum Year'].map((tile) => (
              <div
                key={tile}
                className={`tile ${selectedTile === tile ? 'selected' : ''}`}
                onClick={() => handleTileClick(tile)}
              >
                {tile}
              </div>
            ))}
          </div>

          <div className="options-container">
            {selectedTile && (
              <div className={`tile-options ${selectedTile}`}>
                {tileOptions[selectedTile] &&
                  tileOptions[selectedTile].map((option, index) => (
                    <div key={index} onClick={() => handleOptionClick(selectedTile, option)}>
                      {option}
                    </div>
                  ))}
              </div>
            )}
          </div>
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
        <button onClick={loadMoreGames} style={{ display: hasSearched ? 'block' : 'none' }}>Load More Games</button>
      </div>
    </>
  );
};

export default GameSearch;



