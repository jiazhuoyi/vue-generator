// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import ELEMENT from 'element-ui';
import ELEMENT from 'element-ui';
// import VueSocketIo from 'vue-socket.io';
// import 'element-ui/lib/theme-chalk/index.css';
// import 'font-awesome/css/font-awesome.min.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import './assets/iconfont/iconfont.css';

import App from './App';
import router from './router';
import store from './store';
import filters from './utils/filter';

Vue.config.productionTip = false;

Vue.use(ELEMENT);
Vue.use(filters);
// Vue.use(new VueSocketIo({
//   debug: true,
//   connection: 'http://localhost:3000'
// }));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
