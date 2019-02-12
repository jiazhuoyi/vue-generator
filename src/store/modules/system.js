import request from '@/utils/request';

const system = {
  state: {
    hasRefreshToken: false
  },
  mutations: {
    setHasRefreshToken: (state, isTrue) => {
      state.hasRefreshToken = isTrue;
    }
  },
  actions: {
    refreshToken() {
      return request.get('/token');
    }
  }
};

export default system;
