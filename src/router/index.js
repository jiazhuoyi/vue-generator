import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/dashboard/dashboard';
import Login from '@/views/login';
import Info from '@/views/my/info';
import UpdatePassword from '@/views/my/update-password';
import Photo from '@/views/photo';
import Main from '@/views/main';
import Notice from '@/views/notice/notice';
import UpdateInfo from '@/views/my/update-info';
import Slider from '@/views/slider/index';
import MobileSwiper from '@/views/slider/mobile';
// import Editor from '@/views/editor/index';
import Articles from '@/views/editor/articles';
import Detail from '@/views/editor/detail';
// import Socket from '@/views/socket/index';

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
        icon: 'icon-shouye1'
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
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/signup/index')
    },
    {
      path: '/system',
      name: 'System',
      meta: {
        requireAuth: true,
        title: '系统监控',
        icon: 'icon-xitong'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'system',
          meta: {
            requireAuth: true,
            title: '系统'
          },
          component: () => import('@/views/system/system')
        }
      ]
    },
    {
      path: '/my',
      name: 'My',
      meta: {
        requireAuth: true,
        title: '我的',
        icon: 'icon-wode'
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
        }, {
          path: 'update-info',
          name: 'UpdateInfo',
          meta: {
            requireAuth: true
          },
          component: UpdateInfo
        }
      ]
    },
    {
      path: '/Photo',
      meta: {
        requireAuth: true,
        icon: 'icon-upload-01',
        title: '图片上传'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Photo',
          meta: {
            requireAuth: true
          },
          component: Photo
        }
      ]
    },
    {
      path: '/notice',
      meta: {
        requireAuth: true,
        icon: 'icon-tongzhi',
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
      path: '/slider',
      meta: {
        requireAuth: true,
        icon: 'icon-icon_oa_',
        title: '轮播图'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Slider',
          meta: {
            requireAuth: true
          },
          component: Slider
        }
      ]
    },
    {
      path: '/mobile',
      meta: {
        requireAuth: true,
        icon: 'icon-yidongduan',
        title: '移动端轮播图'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'MobileSwiper',
          meta: {
            requireAuth: true
          },
          component: MobileSwiper
        }
      ]
    },
    {
      path: '/editor',
      meta: {
        requireAuth: true,
        icon: 'icon-bianji',
        title: '富文本编辑器'
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Editor',
          meta: {
            requireAuth: true
          },
          component: () => import('@/views/editor/index')
        }
      ]
    },
    {
      path: '/articles',
      meta: {
        requireAuth: true,
        icon: 'icon-liebiao',
        title: '文章列表',
        breadCrumb: true
      },
      component: Main,
      children: [
        {
          path: '',
          name: 'Articles',
          meta: {
            breadCrumb: true,
            requireAuth: true
          },
          component: Articles
        },
        {
          path: 'detail/:id',
          name: 'Detail',
          title: '详情页',
          meta: {
            breadCrumb: true,
            requireAuth: true
          },
          component: Detail
        }
      ]
    },
    // {
    //   path: '/socket',
    //   meta: {
    //     requireAuth: true,
    //     icon: 'icon-shizhong1',
    //     title: 'socket.io'
    //   },
    //   component: Main,
    //   children: [
    //     {
    //       path: '',
    //       name: 'Socket',
    //       meta: {
    //         requireAuth: true
    //       },
    //       component: Socket
    //     }
    //   ]
    // },
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
    const token = localStorage.getItem('accessToken');
    if (token) {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  } else {
    next();
  }
});

export default router;
