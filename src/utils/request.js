import axios from 'axios';
import router from '@/router';

const url = '/api/v1';

const request = axios.create({
  baseURL: url,
  timeout: 5000
});

request.interceptors.request.use(async (config) => {
  const createTokenAt = localStorage.getItem('createTokenAt');
  const now = Date.now();
  let token;
  // 判断是否accessToken过期
  // true 未过期, false 为过期
  const isNotAccessExpired = (now < ((parseInt(createTokenAt, 10) + 50) * 1000));
  // 判断是否freshToken过期
  const isNotRefreshExpired = (now < ((parseInt(createTokenAt, 10) + 120) * 1000));
  if (isNotAccessExpired) {
    // accessToken 未过期
    token = localStorage.getItem('accessToken');
    config.headers.common.Authorization = `Bearer ${token}`;
  } else if (isNotRefreshExpired && !this.$store.state.hasRefreshToken) {
    // accessToken 过期，refreshToken 未过期, 并且还未请求过新的token
    await this.$store.dispatch('refreshToken');
    token = localStorage.getItem('accessToken');
    config.headers.common.Authorization = `Bearer ${token}`;
  } else if (isNotRefreshExpired && this.$store.state.hasRefreshToken) {
    // accessToken 过期，refreshToken 未过期, 并且请求过新的token
    token = localStorage.getItem('refreshToken');
    config.headers.common.Authorization = `Bearer ${token}`;
    this.$store.commit('setHasRefreshToken', false);
  } else {
    // accessToken 和 freshToken 均过期
    router.push({
      path: '/login'
    });
  }
  return config;
});


request.interceptors.response.use((response) => {
  if (response.status === 200 && response.data.accessToken && response.data.refreshToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('createTokenAt', response.data.createTokenAt);
  }
  if (response.status === 401) {
    // 没有权限
    router.push({
      path: '/login'
    });
  }
  return Promise.resolve(response.data);
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.push({ path: '/login' });
        break;
      default:
        router.push({ path: '/404' });
        break;
    }
  }
  return Promise.resolve(error.response.data);
});

export default request;
