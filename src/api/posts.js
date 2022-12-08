//npm i axios
import axios from 'axios';
import { apiUrl } from '../credentials/Credentials.js'

export default axios.create({
    baseURL: apiUrl
});