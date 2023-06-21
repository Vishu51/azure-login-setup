import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'My Account',
        component: () => import('@/views/MyAccount.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: () => import('@/views/PageNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth || !store.state.auth.tokenAPI || !store.state.auth.tokenAPI.accessToken) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
