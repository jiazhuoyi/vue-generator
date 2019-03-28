const notice = {
  state: {
    totalCount: 0
  },
  mutations: {
    setTotalCount: (state, count) => {
      state.totalCount = count;
    }
  }
};

export default notice;
