import { createRouter, createWebHistory } from 'vue-router'
import SignUpPage from '@/pages/SignUpPage.vue'
import LogInPage from '@/pages/LogInPage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
// import { isAuthenticated } from '@/services/AuthService'
import SettingsPage from '@/pages/SettingsPage.vue'
import AdminPanelPage from '@/pages/AdminPanelPage.vue'
import ReportHistoryPage from '@/pages/ReportHistoryPage.vue'
import GenerateReportPage from '@/pages/GenerateReportPage.vue'
import SubmitReportPage from '@/pages/SubmitReportPage.vue'
import AuthPagesLayout from '@/layouts/AuthPagesLayout.vue'
import AuthenticatedPagesLayout from '@/layouts/AuthenticatedPagesLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
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
      meta: { requiresAuth: true },
      children: [
        { path: 'report', component: ReportHistoryPage },
        { path: 'generate', component: GenerateReportPage },
        { path: 'submit', component: SubmitReportPage },
        { path: 'report/:id', component: ReportHistoryPage },
        { path: ':username/admin', component: AdminPanelPage },
        {
          path: ':username/profile',
          component: ProfilePage,
        },
        {
          path: ':username/settings',
          component: SettingsPage,
        },
        {
          path: ':username',
          component: DashboardPage,
        },
      ],
    },
  ],
})

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
//   const requiredRoles = to.meta.roles as string[] | undefined

//   // const authResponse = await isAuthenticated()
//   // const isLoggedIn = authResponse.success && authResponse.data
//   // const user = authResponse.data

//   if (requiresAuth && !isLoggedIn) {
//     return next('/login')
//   }

//   if (requiresGuest && isLoggedIn) {
//     return next(`/${user.username}`)
//   }

//   if (requiredRoles && (!user || !requiredRoles.includes(user.role))) {
//     return next('/unauthorized')
//   }

//   next()
// })

export default router
