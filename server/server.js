// https://github.com/twitchtv/igdb-api-node

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
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

  } catch (error) {
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
  const currentAccessToken = await getAccessToken();
  try {
    //Hardcoded for testing
    const response = await igdb(clientId, currentAccessToken)
        .fields('*')
        .where('genres.name = "Role-playing (RPG)" & rating >= 80;')
        .limit(2)
        .request('/games');

    console.log(response.data); 
    res.json(response.data);
  } catch (err) {
      console.error("-----ERROR-----");
      console.error(err.response.data);
      console.error("-----ERROR-----");
      console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
