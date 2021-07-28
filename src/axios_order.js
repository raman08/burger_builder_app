import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burger-builder-b0ca0-default-rtdb.firebaseio.com/',
});

export default instance;
