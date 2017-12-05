import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://burger-90e99.firebaseio.com/'
});

export default instance;