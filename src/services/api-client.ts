import axios from 'axios';

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "74f7a5d4da244975b73b667595eefe0e",
  },
});
