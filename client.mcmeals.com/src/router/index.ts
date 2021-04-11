import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


let noAuthGuard = (to: any, from: any, next: any) => {
  (localStorage.getItem("Bearer")) ? next("/") : next()
}

let authGuard = (to: any, from: any, next: any) => {
  (!localStorage.getItem("Bearer")) ? next("/login") : next()
}


const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: () => import('@/views/admin/Admin.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/admin/Users.vue')
      },
      {
        path: 'users',
        component: () => import('@/views/admin/Users.vue')
      },
      {
        path: 'categories',
        component: () => import('@/views/admin/Categories.vue')
      },
      {
        path: 'products',
        component: () => import('@/views/admin/Products.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')  
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    beforeEnter: noAuthGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
    beforeEnter: noAuthGuard
  },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: () => import('@/views/auth/Cart.vue'),
  //   beforeEnter: authGuard
  // },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue')
  },
  {
    path: '/product/:slug',
    name: 'Product',
    props: true,
    component: () => import('@/views/Product.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    props: true,
    component: () => import('@/views/Category.vue')
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router