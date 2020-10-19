import axios from 'axios';

export default function Request(url, params) {
    return axios({
        baseURL: 'https://wd9777183800mbsljr.wilddogio.com/',
        url: url,
        method: 'get',
        ...params,
    });
};