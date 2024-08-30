import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import Dashboard from '@/views/Dashboard.vue'
import TripDetailsView from '@/views/trips/TripDetailsView.vue'
import TripCreateView from '@/views/trips/TripCreateView.vue'
import TripUpdateView from '@/views/trips/TripUpdateView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trip/:id',
      name: 'tripDetails',
      component: TripDetailsView,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trip/edit/:id',
      name: 'tripUpdate',
      component: TripUpdateView,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trip/create',
      name: 'tripCreate',
      component: TripCreateView,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  to.meta.requiresAuth && !authStore.isAuthenticated ? next({ name: 'login' }) : next();
})

export default router
