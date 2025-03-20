import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '@/pages/SignUpPage.vue'
import LogInPage from '@/pages/LogInPage.vue'
import AuthPagesLayout from '@/layouts/AuthPagesLayout.vue'
import LandingPage from '@/pages/LandingPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import AuthenticatedPagesLayout from '@/layouts/AuthenticatedPagesLayout.vue'
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
      path: '/auth',
      name: 'auth',
      component: AuthPagesLayout,
      redirect: '/landing',
      children: [
        { path: 'signup', component: SignUpPage },
        { path: 'login', component: LogInPage },
      ],
    },
    {
      path: '/authenticated',
      name: 'authenticated',
      component: AuthenticatedPagesLayout,
      children: [
        { path: 'dashboard', component: DashboardPage },
        { path: 'report', component: LogInPage },
        { path: 'report-history', component: ReportHistory },
      ],
    },
  ],
})

export default router
