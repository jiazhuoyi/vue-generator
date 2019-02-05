import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedStated from 'vuex-persistedstate';
import user from './modules/user';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedStated({
    storage: window.localStorage,
    reducer(val) {
      return {
        user: val.user
      };
    }
  })]
});

export default store;
