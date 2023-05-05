import axios from "axios";

export const putOrder = (data) => {
  return new Promise((resolve, eject) => {
    const dataResponse = axios.put(
      `http://localhost:3001/orders/${data.id}`,
      data
    );
    resolve(dataResponse);
  });
};
