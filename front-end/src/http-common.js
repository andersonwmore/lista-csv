import axios from "axios";

export default axios.create({
   baseURL: 'https://seuservidoraqui',
  "Content-type": "application/x-www-form-urlencoded"
});

