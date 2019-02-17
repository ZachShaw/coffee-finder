const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const fetchGooglePlace = (id) => {
  return `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${GOOGLE_PLACES_API_KEY}`
};

const Query = {
  async googlePlaceWithId(parent, args, ctx, info) {
    const { id } = args;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${GOOGLE_PLACES_API_KEY}`);
    const payload = JSON.stringify(response.data.result);
    return {
      payload
    };
  }
};

module.exports = Query;
