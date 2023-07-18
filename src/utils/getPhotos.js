import axios from 'axios';

const API_KEY = '36678731-19e8bc7ea7170052877d4194c';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
};

export const getData = async (query, page) => {
  const resultData = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}`
  );
  return resultData.data;
};