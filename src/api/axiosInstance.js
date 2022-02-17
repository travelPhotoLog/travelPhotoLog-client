import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
});

instance.defaults.withCredentials = true;
export default instance;
