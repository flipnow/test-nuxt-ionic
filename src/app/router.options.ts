import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: (_routes) => [
    {
      path: '/',
      redirect: '/tabs/tab1',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/tabs/',
      component: () => import('@/pages/tabs.vue'),
      children: [
        {
          path: '',
          redirect: '/tabs/tab1',
        },
        {
          path: 'tab1',
          name: 'Tab1',
          component: () => import('@/pages/tab1.vue'),
        },
        {
          path: 'tab2',
          name: 'Tab2',
          component: () => import('@/pages/tab2.vue'),
        },
        {
          path: 'tab3',
          component: () => import('@/pages/tab3.vue'),
        },
      ],
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/pages/test.vue'),
    },
    {
      path: '/test-head',
      name: 'TestHead',
      component: () => import('@/pages/test-head.vue'),
    },
  ],
};
