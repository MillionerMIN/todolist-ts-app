import axios from "axios";

export const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      "API-KEY": "2f72d36e-1b52-486b-b6c9-43c87076fed2",
   },
})