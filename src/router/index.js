import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard';
import Login from '@/views/login';
import Info from '@/views/my/info';
import UpdatePassword from '@/views/my/update-password';
import Article from '@/views/article';
import Main from '@/views/main';
import Notice from '@/views/notice/notice';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/dashboard',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dashboard',
      meta: {
        requireAuth: true,
        title: '首页',
        icon: 'menu'
      },
      component: Main,
      children: [{
        path: '',
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
      meta: {
        requireAuth: true,
        title: '我的',
        icon: 'setting'
      },
      component: Main,
      children: [
        {
          path: 'info',
          name: 'Info',
          meta: {
            requireAuth: true,
            title: '个人信息'
          },
          component: Info
        }, {
          path: 'update-password',
          name: 'UpdatePassword',
          meta: {
            requireAuth: true,
            title: '修改密码'
          },
          component: UpdatePassword
        }
      ]
    },
    {
      path: '/article',
      meta: {
        requireAuth: true,
        icon: 'tickets',
        title: '文章'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Article',
          meta: {
            requireAuth: true
          },
          component: Article
        }
      ]
    },
    {
      path: '/notice',
      meta: {
        requireAuth: true,
        icon: 'tickets',
        title: '通知'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Notice',
          meta: {
            requireAuth: true
          },
          component: Notice
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
