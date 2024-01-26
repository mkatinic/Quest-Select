// https://github.com/twitchtv/igdb-api-node
// Search fields = 'genres.name, rating, platforms.name, release_dates.y

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { query } = require('express');
const igdb = require('igdb-api-node').default;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const twitchTokenUrl = 'https://id.twitch.tv/oauth2/token';

let accessToken = null;
let tokenExpirationTime = 0;

if (!clientId || !clientSecret) {
  console.error('Missing Twitch API credentials.');
  process.exit(1);
}

const getToken = async () => {
  try {
    const response = await axios.post(twitchTokenUrl, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
    });

    accessToken = response.data.access_token;
    tokenExpirationTime = Date.now() + response.data.expires_in * 1000;

  }catch (error) {
    console.error('Error getting access token:', error.message);
  }
};

const getAccessToken = async () => {
  if (!isTokenValid()) {
    await getToken();
  }
  return accessToken;
};

const isTokenValid = () => {
  return Date.now() < tokenExpirationTime;
};

app.post('/api/searchGames', async (req, res) => {
  const selectedOptions = req.body.selectedOptions;
  const currentAccessToken = await getAccessToken();
  const query = buildQueryString(selectedOptions);
  
  try {
    const response = await igdb(clientId, currentAccessToken)
      .fields('platforms,platforms.name,name,genres.name,cover,cover.image_id,platforms,rating,rating_count,summary,total_rating,total_rating_count,url')
      .offset(req.body.offset)
      .sort('rating', 'desc')
      .where(`${query}`)
      .request('/games');

    res.json(response.data);
  } catch (err) {
    console.error("-----ERROR-----");
    console.error(err.response.data);
    console.error("-----ERROR-----");
    console.error(err);
  }
});

function buildQueryString(selectedOptions) {
  let queryString = '';
  let idx = 0

  for(const option of selectedOptions) {
    if(option[0] == 'Platform'){
      queryString += `platforms.name = "${option[1]}"`;
    } else if(option[0] == 'Genre') {
      queryString += `genres.name = "${option[1]}"`;
    } else if(option[0] == 'Mode') {
      queryString += `game_modes.name = "${option[1]}"`;
    } else if(option[0] == 'Theme') {
      queryString += `themes.name = "${option[1]}"`;
    } else if(option[0] == 'Minimum Rating') {
      queryString += `rating >= ${option[1]}`;
    } else if(option[0] == 'Minimum Year') {
      queryString += `release_dates.y >=  ${option[1]}`;
    }

    idx++;
    if(idx < selectedOptions.length){
      queryString += " & ";
    }else {
      queryString += ";";
    }
  }

  return queryString;
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
