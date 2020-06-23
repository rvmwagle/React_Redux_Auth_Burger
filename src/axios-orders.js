import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://react-my-burger-9a349.firebaseio.com/'
});

export default axiosInstance;