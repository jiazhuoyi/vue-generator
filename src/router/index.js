import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard';
import Login from '@/views/login';
import Info from '@/views/my/info';
import UpdatePassword from '@/views/my/update-password';
import Article from '@/views/article';
import Main from '@/views/main';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      title: '首页',
      icon: 'menu',
      redirect: '/dashboard',
      meta: {
        requireAuth: true
      },
      component: Main,
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        meta: {
          requireAuth: true
        },
        component: Dashboard
      }]
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
      meta: {
        requireAuth: true
      },
      component: Main,
      children: [
        {
          path: 'info',
          name: 'Info',
          title: '个人信息',
          meta: {
            requireAuth: true
          },
          component: Info
        }, {
          path: 'update-password',
          name: 'UpdatePassword',
          title: '修改密码',
          meta: {
            requireAuth: true
          },
          component: UpdatePassword
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      title: '文章',
      redirect: '/article/article_index',
      icon: 'tickets',
      meta: {
        requireAuth: true
      },
      component: Main,
      children: [
        {
          path: 'article_index',
          name: 'article_index',
          meta: {
            requireAuth: true
          },
          component: Article
        }
      ]
    },
    {
      path: '*',
      name: '404',
      meta: {},
      component: () => import('@/views/404')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user.status === 'online') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
