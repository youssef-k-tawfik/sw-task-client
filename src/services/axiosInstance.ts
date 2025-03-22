import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sw-task-server.yousseftawfik.com/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
