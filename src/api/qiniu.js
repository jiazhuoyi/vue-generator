import axios from 'axios';

const url = 'https://upload-z0.qiniup.com';
const domin = '';
const config = {
  headers: { 'Content-Type': 'multipart/form-data' }
};

const requestQiuNiu = axios.create({
  baseURL: url,
  timeout: 1000
});

export default function uploadImage(token, formData) {
  return requestQiuNiu.post(domin, formData, config);
}
