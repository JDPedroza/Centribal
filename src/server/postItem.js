import axios from 'axios';

export const postItem = (data)=>{
	return new Promise((resolve, eject )=>{
		const dataResponse = axios.post(`http://localhost:3001/items`, data);
		resolve(dataResponse);
	})
}