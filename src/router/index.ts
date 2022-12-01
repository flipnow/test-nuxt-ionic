import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { RouteName } from './types';
// import { useAuth } from '@/composables/useAuth';
import { Capacitor } from '@capacitor/core';
// import { useAnalytics } from '@/composables/useAnalytics';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/components/navigation/BaseNavigation.vue'),
    children: [
      {
        path: '/',
        name: RouteName.Home,
        meta: {
          hideOnAppLanding: true,
          requiresGradientStyle: true,
        },
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: '/home',
        redirect: '/',
      },
      {
        path: '/shows/:id',
        name: RouteName.SingleShow,
        meta: {
          hideOnAppLanding: true,
        },
        component: () => import('@/views/SingleShowPage.vue'),
      },
      {
        path: '/shows',
        name: RouteName.Shows,
        meta: {
          tabletVisible: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/ShowsPage.vue'),
      },
      {
        path: '/hosts',
        name: RouteName.Hosts,
        meta: {
          tabletVisible: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/HostsPage.vue'),
      },
      {
        path: '/products',
        name: RouteName.Products,
        meta: {
          tabletVisible: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/ProductsPage.vue'),
      },
      {
        path: '/categories',
        name: RouteName.Categories,
        meta: {
          hideOnAppLanding: true,
        },
        component: () => import('@/views/CategoriesPage.vue'),
      },
      {
        path: '/orders',
        name: RouteName.Orders,
        meta: {
          hideOnAppLanding: true,
          requireAuth: true,
        },
        component: () => import('@/views/OrdersPage.vue'),
      },
      {
        path: '/get-featured',
        name: RouteName.GetFeatured,
        meta: {
          requiresGradientStyle: true,
          hideOnIos: true,
        },
        component: () => import('@/views/GetFeaturedPage.vue'),
      },
      {
        path: '/hosts/:id',
        name: RouteName.SingleHost,
        meta: {
          hideOnAppLanding: true,
        },
        component: () => import('@/views/SingleHostPage.vue'),
      },
      {
        path: '/favorites',
        name: RouteName.Favorites,
        meta: {
          requireAuth: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/FavoritesPage.vue'),
      },
      {
        path: '/profile',
        name: RouteName.Profile,
        meta: {
          requireAuth: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/UserProfilePage.vue'),
      },
      {
        path: '/get-in-touch',
        name: RouteName.GetInTouch,
        meta: {
          requiresGradientStyle: true,
        },
        component: () => import('@/views/ContactPage.vue'),
      },
      {
        path: '/account-closed',
        name: RouteName.AccountClosed,
        props: true,
        meta: {
          hideFooter: true,
          hideOnAppLanding: true,
        },
        component: () => import('@/views/CloseAccountPage.vue'),
      },
      {
        path: '/how-it-works',
        name: RouteName.HowItWorks,
        meta: {
          requiresGradientStyle: true,
        },
        component: () => import('@/views/HowItWorksPage.vue'),
      },
      {
        path: '/terms-and-conditions',
        name: RouteName.TermsAndConditions,
        component: () => import('@/views/TermsPage.vue'),
        meta: {
          scrollToTop: true,
        },
      },
      {
        path: '/privacy-policy',
        name: RouteName.PrivacyPolicy,
        component: () => import('@/views/PrivacyPolicyPage.vue'),
        meta: {
          scrollToTop: true,
        },
      },
      {
        path: '/:catchAll(.*)',
        name: RouteName.NotFound,
        component: () => import('@/views/NotFoundPage.vue'),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (to) => {
//   if (to.meta.requireAuth) {
//     const { isUserLoggedIn } = useAuth();
//     const isLoggedIn = await isUserLoggedIn();

//     if (!isLoggedIn) return { name: RouteName.Home };
//   }

//   if (to.meta.hideOnAppLanding) {
//     if (window.location.href.includes('sprii.app')) {
//       return { name: RouteName.GetInTouch };
//     }
//   }

//   if (to.meta.hideOnIos) {
//     if (Capacitor.getPlatform() === 'ios') {
//       return { name: RouteName.NotFound };
//     }
//   }
// });

// router.afterEach((to, from) => {
//   const { logEvent } = useAnalytics();

//   if (to.name !== from.name) {
//     if (Capacitor.isNativePlatform()) {
//       logEvent('screen_view', {
//         screen_class: to.name,
//         screen_name: to.name,
//         page_location: window.location.href,
//         page_path: to.fullPath,
//         page_title: to.name,
//       });
//     } else {
//       logEvent('page_view', {
//         page_location: window.location.href,
//         page_path: to.fullPath,
//         page_title: to.name,
//       });
//     }
//   }
// });
