import request from '@/utils/request';

const user = {
  state: {
    account: '',
    name: '',
    status: '',
    token: '',
    roles: [],
    avatar: ''
  },
  mutations: {
    setUser: (state, userInfo) => {
      state.name = userInfo.name;
      state.account = userInfo.account;
      state.token = userInfo.accessToken;
    },
    deleteUser: (state) => {
      state.account = '';
      state.name = '';
      state.roles = [];
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  actions: {
    login(context, userInfo) {
      const account = userInfo.account.trim();
      return request({
        url: '/login',
        method: 'post',
        data: {
          account,
          password: userInfo.password
        }
      });
    },
    getUserInfo() {
      return request({
        url: '/user-info',
        method: 'get'
      });
    },
    logout({ commit }, account) {
      return new Promise((resolve, reject) => {
        request({
          url: '/logout',
          method: 'post',
          data: {
            account
          }
        }).then((result) => {
          if (result.status === 200) {
            commit('deleteUser');
            resolve(result);
          }
          reject(JSON.stringify(result));
        }).catch((error) => {
          reject(JSON.stringify(error));
        });
      });
    }
  }
};

export default user;
