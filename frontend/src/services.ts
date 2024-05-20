import axios from "axios";

export const userService = axios.create({
  baseURL: "http://34.229.92.10:8001",
});

export const imagesService = axios.create({
  baseURL: "http://34.229.92.10:8002",
});
