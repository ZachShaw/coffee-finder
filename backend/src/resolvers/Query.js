const axios = require('axios');

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY;

const locationIqBaseApi = `https://eu1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}`
const placesBaseApi = 'https://maps.googleapis.com/maps/api/place'

const queryGeocodeFromAddress = (query) => {
  return `${locationIqBaseApi}&q=${query}&format=json`
}

const queryPlacesWithGeocode = (lat, long) => {
  return `${placesBaseApi}/nearbysearch/json?location=${lat}, ${long}&radius=1500&keyword=coffee&key=${GOOGLE_PLACES_API_KEY}`
};

const Query = {
  async placeWithId(parent, args, ctx, info) {
    const { id } = args;
    const response = await axios.get(`${placesBaseApi}/details/json?placeid=${id}&key=${GOOGLE_PLACES_API_KEY}`);
    const payload = JSON.stringify(response.data.result);
    return {
      payload
    };
  },
  async placesWithAddress(parent, args, ctx, info) {
    const { query } = args;
    const { lat, lon } = await axios.get(queryGeocodeFromAddress(query));
    const response = await axios.get(queryPlacesWithGeocode(lat, lon));
    const payload = JSON.stringify(response.data.results);
    return {
      payload
    };
  },
  async placesWithGeocode(parent, args, ctx, info) {
    const { lat, long, radius } = args;
    const response = await axios.get(queryPlacesWithGeocode(lat, long));
    const payload = JSON.stringify(response.data.results);
    return {
      payload
    };
  }
};

module.exports = Query;
