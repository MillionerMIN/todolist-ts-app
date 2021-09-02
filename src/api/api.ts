import axios from "axios";

export const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      "API-KEY": "c776464e-9336-49f9-96f6-6e3857c87294",
   },
})