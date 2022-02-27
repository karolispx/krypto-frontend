import { createRouter, createWebHistory } from 'vue-router'

import {store} from "../_store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/authentication/LoginView.vue'),
      meta: {
        title: 'Krypto - Login',
        loggedOutAccessOnly: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('../views/authentication/RegisterView.vue'),
      meta: {
        title: 'Krypto - Register',
        loggedOutAccessOnly: true
      }
    },

    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/authentication/ResetPasswordView.vue'),
      meta: {
        title: 'Krypto - Reset Password',
        loggedOutAccessOnly: true
      }
    },

    {
      path: '/logout',
      name: 'logout',
      meta: {
          title: 'Logout - Crypto Portfolio',
          logoutPage: true
      }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/user/DashboardView.vue'),
      meta: {
        title: 'Krypto - Dashboard',
        loggedInAccessOnly: true
      }
    },

    {
      path: '/account-settings',
      name: 'account-settings',
      component: () => import('../views/user/AccountSettingsView.vue'),
      meta: {
        title: 'Krypto - Account Settings',
        loggedInAccessOnly: true
      }
    },

    {
      path: '/api-settings',
      name: 'api-settings',
      component: () => import('../views/user/APISettingsView.vue'),
      meta: {
        title: 'Krypto - API Settings',
        loggedInAccessOnly: true
      }
    },

    {
      path: '/dashboard/:token',
      name: 'api-dashboard',
      component: () => import('../views/public/APIDashboard.vue'),
      meta: {
        title: 'Krypto - API Dashboard'
      }
    },

    {
      path: '/alerts',
      name: 'alerts',
      component: () => import('../views/user/AlertsView.vue'),
      meta: {
        title: 'Krypto - Alerts',
        loggedInAccessOnly: true
      }
    },

    {
      path: '/404',
      name: '404',
      component: () => import('../views/public/404.vue'),
      meta: {
          title: 'Krypto - 404 Page Not Found'
      }
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/404'
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if ( to.meta.title ) {
      document.title = to.meta.title
  }

  const authenticated = store.state.authentication.authenticated;

  if ( ( to.meta.loggedInAccessOnly || to.meta.logoutPage ) && ! authenticated ) {
      console.log("You are not allowed to access that page!")

      return next('/login');
  }else if ( to.meta.loggedOutAccessOnly && authenticated ) {
      console.log("You are not allowed to access that page!")

      return next('/dashboard');
  } else if ( to.meta.logoutPage && authenticated ) {
      store.dispatch('authentication/logout');

      console.log("You have logged out successfully!")

      return next('/login');
  }  else {
      next()
  }
});