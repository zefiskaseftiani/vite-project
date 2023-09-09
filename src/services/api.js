import Axios from "axios";

const api = Axios.create({
  baseURL: "https://todolist-api.sawala.dev/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
