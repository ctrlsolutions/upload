import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '@/pages/SignUpPage.vue'
import LogInPage from '@/pages/LogInPage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import { isAuthenticated } from '@/services/AuthService'
import SettingsPage from '@/pages/SettingsPage.vue'
import AdminPanelPage from '@/pages/AdminPanelPage.vue'
import ReportHistoryPage from '@/pages/ReportHistoryPage.vue'
import GenerateReportPage from '@/pages/GenerateReportPage.vue'
import SubmitReportPage from '@/pages/SubmitReportPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'landing',
          component: LandingPage,
          meta: { layout: 'landing' },
        },
        {
          path: 'signup',
          component: SignUpPage,
          meta: { layout: 'auth', requiresGuest: true, title: 'Sign Up' },
        },
        {
          path: 'login',
          component: LogInPage,
          meta: { layout: 'auth', requiresGuest: true, title: 'Log In' },
        },
        {
          path: 'reports',
          component: ReportHistoryPage,
          meta: { layout: 'main', requiresAuth: true },
          children: [
            { path: 'history', component: ReportHistoryPage },
            { path: 'generate', component: GenerateReportPage },
            { path: 'submit', component: SubmitReportPage },
            { path: ':id', component: GenerateReportPage },
          ],
        },
        {
          path: 'admin',
          component: AdminPanelPage,
          meta: { layout: 'main', requiresAuth: true, roles: ['admin'] },
        },
        {
          path: ':username',
          component: DashboardPage,
          meta: { layout: 'main', requiresAuth: true },
          children: [
            { path: 'profile', component: ProfilePage },
            { path: 'settings', component: SettingsPage },
          ],
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const requiredRoles = to.meta.roles as string[] | undefined

  const authResponse = await isAuthenticated()
  const isLoggedIn = authResponse.success && authResponse.data
  const user = authResponse.data

  if (requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (requiresGuest && isLoggedIn) {
    return next(`/${user.username}`)
  }

  if (requiredRoles && (!user || !requiredRoles.includes(user.role))) {
    return next('/unauthorized')
  }

  next()
})

export default router
