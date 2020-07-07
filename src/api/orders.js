import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tastyburgs.firebaseio.com/'
});

export default instance;
