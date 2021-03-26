import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store';


let noAuthGuard = (to: any, from: any, next: any) => {
  (localStorage.getItem("token")) ? next("/") : next()
}

let authGuard = (to: any, from: any, next: any) => {
  (!localStorage.getItem("token")) ? next("/login") : next()
}


const routes: Array<RouteRecordRaw> = [
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
  //   path: '/account',
  //   name: 'Account',
  //   component: () => import('@/views/auth/Account.vue'),
  //   beforeEnter: authGuard
  // },
  // {
  //   path: '/cart',
  //   name: 'Cart',
  //   component: () => import('@/views/auth/Cart.vue'),
  //   beforeEnter: authGuard
  // },
  // {
  //   path: '/shop',
  //   name: 'Shop',
  //   component: () => import('@/views/Shop.vue')
  // },
  // {
  //   path: '/meal/:id',
  //   name: 'Meal',
  //   props: true,
  //   component: () => import('@/views/Meal.vue')
  // },
  // {
  //   path: '/category/:id',
  //   name: 'Category',
  //   props: true,
  //   component: () => import('@/views/Category.vue')
  // },
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