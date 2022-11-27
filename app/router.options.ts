import type { RouterConfig } from '@nuxt/schema'
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
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
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/pages/tabs/tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/pages/tabs/tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/pages/tabs/tab3.vue')
      }
    ]
  }
  ],
}

