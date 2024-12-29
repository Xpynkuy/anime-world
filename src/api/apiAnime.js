import axios from "axios";

export const IMG_HOST = 'https://static-libria.weekstorm.us'

export const $api = axios.create({
  baseURL: "https://anilibria.top/api/v1",
});
