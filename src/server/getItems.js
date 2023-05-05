import axios from "axios";

export const getItems = () => {
  return new Promise((resolve, eject) => {
    const dataResponse = axios.get(`http://localhost:3001/items`);
    resolve(dataResponse);
  });
};
