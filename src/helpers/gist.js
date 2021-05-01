import axios from "axios";

const gistId = process.env.REACT_APP_GIST_ID;

const headers = {
  Authorization: `token ${process.env.REACT_APP_GIST_TOKEN}`,
};

export const getGist = () => {
  return axios.get(`https://api.github.com/gists/${gistId}`);
};

export const updateGist = (data) => {
  return axios.patch(`https://api.github.com/gists/${gistId}`, data, {
    headers,
  });
};
