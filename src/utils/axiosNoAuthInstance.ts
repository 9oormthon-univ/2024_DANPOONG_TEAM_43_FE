import axios from 'axios';

const axiosNoAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, 
  headers: {
    Accept: '*/*',
  },
});

export default axiosNoAuthInstance;