import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminApp.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('../views/admin/HomeView.vue')
      },
      {
        path: 'master/categories',
        name: 'master.category',
        component: () => import('../views/admin/master/category/ListCategoryView.vue')
      },
      {
        path: 'master/categories/create',
        name: 'master.category.create',
        component: () => import('../views/admin/master/category/CreateCategoryView.vue')
      },
      {
        path: 'master/categories/show/:id',
        name: 'master.category.show',
        props: true,
        component: () => import('../views/admin/master/category/ShowCategoryView.vue')
      },
      {
        path: 'master/products',
        name: 'master.product',
        component: () => import('../views/admin/master/product/ListProductView.vue')
      },
      {
        path: 'master/products/create',
        name: 'master.product.create',
        component: () => import('../views/admin/master/product/CreateProductView.vue')
      },
      {
        path: 'master/products/show/:id',
        name: 'master.product.show',
        props: true,
        component: () => import('../views/admin/master/product/ShowProductView.vue')
      },
      {
        path: 'master/provinces',
        name: 'master.province',
        component: () => import('../views/admin/master/province/ListProvinceView.vue')
      },
      {
        path: 'master/provinces/create',
        name: 'master.province.create',
        component: () => import('../views/admin/master/province/CreateProvinceView.vue')
      },
      {
        path: 'master/provinces/show/:id',
        name: 'master.province.show',
        props: true,
        component: () => import('../views/admin/master/province/ShowProvinceView.vue')
      },
      {
        path: 'master/cities',
        name: 'master.cities',
        component: () => import('../views/admin/master/city/ListCityView.vue')
      },
      {
        path: 'master/cities/create',
        name: 'master.city.create',
        component: () => import('../views/admin/master/city/CreateCityView.vue')
      },
      {
        path: 'master/cities/show/:id',
        name: 'master.city.show',
        props: true,
        component: () => import('../views/admin/master/city/ShowCityView.vue')
      },
      {
        path: 'master/banners',
        name: 'master.banners',
        component: () => import('../views/admin/master/banner/ListBannerView.vue')
      },
      {
        path: 'master/banners/create',
        name: 'master.banner.create',
        component: () => import('../views/admin/master/banner/CreateBannerView.vue')
      },
      {
        path: 'master/banners/show/:id',
        name: 'master.banner.show',
        props: true,
        component: () => import('../views/admin/master/banner/ShowBannerView.vue')
      }
    ]
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
    path: '/users/profile',
    component: () => import('../views/user/ProfilePage.vue')
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
    path: '/delivery/:cartId',
    component: () => import('../views/shipping/ShippingPage.vue')
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
  routes,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0, behavior: 'smooth' }
  }
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
