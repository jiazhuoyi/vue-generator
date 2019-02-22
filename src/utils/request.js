import axios from 'axios';
import router from '@/router';
import store from '@/store';

// const url = '/api/v1';
// const url = `${process.env.API_HOST}/api/v1`;

const url = process.env.NODE_ENV === 'production' ? `${process.env.API_HOST}/api/v1` : '/api/v1';

const request = axios.create({
  baseURL: url,
  timeout: 1000
});

request.interceptors.request.use(async (config) => {
  console.log('===========================================================');
  console.log('-----发送', config.method, '请求:', config.url);
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
      path: '/login', query: { redirect: window.location.pathname }
    });
  }
  console.log('===========================================================');
  return config;
});


request.interceptors.response.use((response) => {
  const resCode = response.data.status;
  if (resCode === 200 && response.data.accessToken && response.data.refreshToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('createTokenAt', response.data.createTokenAt);
    return Promise.resolve(response.data);
  } else if (resCode === 200) {
    return Promise.resolve(response.data);
  }
  if (resCode === 401) {
    // 没有权限
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push({
      path: '/login'
    });
  }
  return Promise.reject(response.data);
}, (error) => {
  const data = {
    status: 50001,
    msg: '连接服务器失败'
  };
  console.log('请求发生错误的页面:', window.location.pathname);
  if (error && error.response) {
    const ref = window.location.pathname;
    switch (error.response.status) {
      case 401:
        data.status = 401;
        data.msg = '您的登录已过期';
        router.push({ path: '/login', query: { redirect: ref } });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        break;
      case 404:
        data.status = 404;
        data.msg = '后端请求出错(404)';
        break;
      case 504:
        data.status = 504;
        data.msg = '网络超时(504)';
        break;
      default:
        break;
    }
  }
  return Promise.reject(data);
});

export default request;
