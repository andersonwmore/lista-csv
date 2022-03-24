import axios from "axios";

export default axios.create({
   baseURL: 'https://nodeserver.tecnonex.com.br',
  "Content-type": "application/x-www-form-urlencoded"
});

