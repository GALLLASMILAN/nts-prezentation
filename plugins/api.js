import axios from 'axios';

export default function api(content, inject) {
    const api = axios.create({baseURL: `${process.env.baseUrl}`});
    inject('api', api);
}