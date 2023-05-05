import axios from "axios";

export const getOrders = () => {
  return new Promise((resolve, eject) => {
    const dataResponse = axios.get(`http://localhost:3001/orders`);
    resolve(dataResponse);
  });
};
