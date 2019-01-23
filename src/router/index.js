import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard';
import Login from '@/views/login';
import Info from '@/views/my/info';
import UpdatePassword from '@/views/my/update-password';
import Article from '@/views/article';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      title: '首页',
      icon: 'menu',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/my',
      name: 'My',
      title: '我的',
      icon: 'setting',
      component: () => import('@/views/my'),
      children: [
        {
          path: 'info',
          name: 'Info',
          title: '个人信息',
          component: Info
        }, {
          path: 'update-password',
          name: 'UpdatePassword',
          title: '修改密码',
          component: UpdatePassword
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      title: '文章',
      icon: 'tickets',
      component: Article
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404')
    }
  ]
});
