import axios from 'axios';

export const postOrder = (data)=>{
	return new Promise((resolve, eject )=>{
		const dataResponse = axios.post(`http://localhost:3001/orders`, data);
		resolve(dataResponse);
	})
}