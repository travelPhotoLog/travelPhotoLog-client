import axios from "axios";

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER_URI,
  },
  baseURL: process.env.REACT_APP_SERVER_URI,
});

instance.defaults.withCredentials = true;
export default instance;
