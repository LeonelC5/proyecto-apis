import axios from "axios";

export const userService = axios.create({
  baseURL: "http://lb-prod-382715286.us-east-1.elb.amazonaws.com:8001",
});

export const imagesService = axios.create({
  baseURL: "http://lb-prod-382715286.us-east-1.elb.amazonaws.com:8002",
});
