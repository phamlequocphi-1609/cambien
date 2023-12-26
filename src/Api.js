import axios from "axios";
export default axios.create({
  baseURL: `http://192.168.211.1:7122/api`,
});
