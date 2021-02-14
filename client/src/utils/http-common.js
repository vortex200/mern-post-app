import axios from "axios";
import Config from "./Config";

export default axios.create({
  baseURL: Config.BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});
