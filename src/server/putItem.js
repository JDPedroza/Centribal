import axios from "axios";

export const putItem = (data) => {
  return new Promise((resolve, eject) => {
    const dataResponse = axios.put(
      `http://localhost:3001/orders/${data.id}`,
      data
    );
    resolve(dataResponse);
  });
};
