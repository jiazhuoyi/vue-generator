import axios from 'axios';
import router from '@/router';
import store from '@/store';

// const url = '/api/v1';
const url = `${process.env.API_HOST}/api/v1`;

const request = axios.create({
  baseURL: url,
  timeout: 5000
});

request.interceptors.request.use(async (config) => {
  console.log('===========================================================');
  console.log('-----发送请求:', config.url);
  const createTokenAt = localStorage.getItem('createTokenAt');
  const now = Date.now();
  let token;
  // 判断是否accessToken过期
  // true 未过期, false 为过期
  const isNotAccessExpired = (now < ((parseInt(createTokenAt, 10) + 590) * 1000));
  // 判断是否freshToken过期
  const isNotRefreshExpired =
    (now < ((parseInt(createTokenAt, 10) + ((24 * 60 * 60) - 20)) * 1000));
  console.log('accessToken:', isNotAccessExpired, '  , refreshToken:', isNotRefreshExpired);
  console.log('-----hasRefreshToken:', store.state.system.hasRefreshToken);
  if (isNotAccessExpired) {
    // accessToken 未过期
    token = localStorage.getItem('accessToken');
    config.headers.common.Authorization = `Bearer ${token}`;
  } else if (isNotRefreshExpired && !store.state.system.hasRefreshToken) {
    // accessToken 过期，refreshToken 未过期, 并且还未请求过新的token
    store.commit('setHasRefreshToken', true);
    await store.dispatch('refreshToken');
    token = localStorage.getItem('accessToken');
    config.headers.common.Authorization = `Bearer ${token}`;
  } else if (isNotRefreshExpired && store.state.system.hasRefreshToken) {
    // accessToken 过期，refreshToken 未过期, 并且请求过新的token
    token = localStorage.getItem('refreshToken');
    config.headers.common.Authorization = `Bearer ${token}`;
    store.commit('setHasRefreshToken', false);
  } else {
    // accessToken 和 freshToken 均过期
    router.push({
      path: '/login'
    });
  }
  console.log('===========================================================');
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
  return Promise.resolve(error.response);
});

export default request;
