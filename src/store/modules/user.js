import request from '@/utils/request';

const user = {
  state: {
    account: '',
    name: '',
    status: '',
    token: '',
    roles: [],
    avatar: '',
    hasRefreshToken: false
  },
  mutations: {
    setUser: (state, userInfo) => {
      state.name = userInfo.name;
      state.account = userInfo.account;
      state.status = 'online';
      state.token = userInfo.accessToken;
    },
    deleteUser: (state) => {
      state.status = '';
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
    logout({ commit }) {
      commit('deleteUser');
      return new Promise((resolve) => {
        resolve();
      });
    }
  }
};

export default user;
