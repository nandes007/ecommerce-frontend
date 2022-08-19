import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/login',
    component: () => import('../views/auth/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('../views/auth/RegisterPage.vue')
  },
  {
    path: '/verify/:code',
    component: () => import('../views/auth/VerifyPage.vue')
  },
  {
    path: '/forgot-password',
    component: () => import('../views/auth/ForgotPasswordPage.vue')
  },
  {
    path: '/reset-password/:token',
    component: () => import('../views/auth/ResetPasswordPage.vue'),
    props: true
  },
  {
    path: '/products/:id/:slug',
    component: () => import('../views/product/ProductDetailPage.vue'),
    props: true
  },
  {
    path: '/categories/:slug',
    component: () => import('../views/category/CategoryPage.vue')
  },
  {
    path: '/carts',
    component: () => import('../views/cart/CartPage.vue'),
    meta: { authOnly: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  },
  {
    path: '/tester',
    component: () => import('../views/PageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isLoggedIn () {
  return localStorage.getItem('_token')
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLoggedIn) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
