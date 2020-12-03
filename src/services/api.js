import axios from "axios";

const api = axios.create({
    baseURL: "https://crongrama-exercicios-back.herokuapp.com"
  });

  export default api;

