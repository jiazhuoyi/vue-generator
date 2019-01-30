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
      state.status = 'online';
    },
    deleteUser: (state) => {
      state.status = '';
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const user1 = userInfo;
      commit('setUser', user1);
      return new Promise((resolve) => {
        resolve();
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
