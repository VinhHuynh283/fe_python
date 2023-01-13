import axios from "axios";

export default axios.create({
  baseURL: "https://pyavbe.herokuapp.com",
  timeout: 1000,
});
