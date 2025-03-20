import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '@/pages/SignUpPage.vue'
import LogInPage from '@/pages/LogInPage.vue'
import AuthPagesLayout from '@/layouts/AuthPagesLayout.vue'
import LandingPage from '@/pages/LandingPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import AuthenticatedPagesLayout from '@/layouts/AuthenticatedPagesLayout.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import { isAuthenticated } from '@/services/AuthService'
import SettingsPage from '@/pages/SettingsPage.vue'
import ReportHistory from '@/pages/ReportHistoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage, // TODO: add separate routing for sub components: [about, section]
    },

    {
      path: '/',
      name: 'auth',
      component: AuthPagesLayout,
      redirect: '/landing',
      children: [
        { path: 'signup', component: SignUpPage },
        { path: 'login', component: LogInPage },
      ],
    },
    {
      path: '/',
      name: 'authenticated',
      component: AuthenticatedPagesLayout,
      redirect: '/landing',
      children: [
        { path: 'report', component: LogInPage },
        { path: 'report-history', component: ReportHistory },
        {
          path: ':username/profile',
          component: ProfilePage,
          meta: { requiresAuth: true },
        },
        {
          path: ':username/settings',
          component: SettingsPage,
          meta: { requiresAuth: true },
        },
        {
          path: ':username',
          component: DashboardPage,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const authResponse = await isAuthenticated()

    if (!authResponse.success || !authResponse.data) {
      return next('/login')
    }
  }
  next()
})

export default router
