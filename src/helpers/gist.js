import axios from "axios";
import { randomId } from "./common";

const REACT_APP_GIST_TOKEN = process.env.REACT_APP_GIST_TOKEN || "";

axios.defaults.headers = {
  Authorization: `token ${atob(REACT_APP_GIST_TOKEN)}`,
};

const gistId = process.env.REACT_APP_GIST_ID;

export const getGist = async () => {
  return axios.get(`https://api.github.com/gists/${gistId}?${randomId()}`);
};

export const updateGist = async (data) => {
  return axios.patch(`https://api.github.com/gists/${gistId}`, data);
};
