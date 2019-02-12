import axios from 'axios';
import router from '@/router';

const url = '/api/v1';

const request = axios.create({
  baseURL: url,
  timeout: 5000
});

// request.interceptors.request.use(async (config) => {
//   const createTokenAt = localStorage.getItem('createTokenAt');
//   const now = Date.now();
//   console.log('-----now:', now);
//   console.log('-----cre:', createTokenAt);
//   console.log('-----exp:', (parseInt(createTokenAt, 10) + 50) * 1000);
//   let token;
//   // 判断是否过期
//   const isNotAccessExpired = (now < ((parseInt(createTokenAt, 10) + 50) * 1000));
//   // const isNotRefreshExpired = (now < ((parseInt(createTokenAt) + 60 * 60 * 24) * 1000))
//   const isNotRefreshExpired = (now < ((parseInt(createTokenAt, 10) + 120) * 1000));
//   console.log('---------isNotAccessExpired:', isNotAccessExpired);
//   console.log('---------isNotRefreshExpired:', isNotRefreshExpired);
//   if (isNotAccessExpired) {
//     // accessToken 未过期
//     console.log('未过期');
//     token = localStorage.getItem('accessToken');
//     config.headers.common.Authorization = `Bearer ${token}`;
//   } else if (isNotRefreshExpired && !this.$store.state.user.hasRefreshToken) {
//     // accessToken 过期，refreshToken 未过期, 并且还未请求过新的token
//     console.log('----------1---');
//     this.$store.commit('setHasRefreshToken', true);
//     await this.$store.dispatch('refreshToken');
//     token = localStorage.getItem('accessToken');
//     config.headers.common.Authorization = `Bearer ${token}`;
//   } else if (isNotRefreshExpired && this.$store.state.user.hasRefreshToken) {
//     // accessToken 过期，refreshToken 未过期, 并且请求过新的token
//     console.log('----------2---');
//     token = localStorage.getItem('refreshToken');
//     config.headers.common.Authorization = `Bearer ${token}`;
//     this.$store.commit('setHasRefreshToken', false);
//   } else {
//     this.$store.commit('setLoginStatus', false);
//     token = localStorage.getItem('accessToken');
//     config.headers.common.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

request.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('accessToken');
  config.headers.common.Authorization = `Bearer ${token}`;
  return config;
});


request.interceptors.response.use((response) => {
  if (response.status === 200 && response.data.accessToken && response.data.refreshToken) {
    console.log('response:', response.status);
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
        router.push({ path: '/401' });
        break;
      default:
        router.push({ path: '/404' });
        break;
    }
  }
  return Promise.resolve(error.response.data);
});

export default request;
