import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedStated from 'vuex-persistedstate';
import user from './modules/user';
import system from './modules/system';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    system
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
