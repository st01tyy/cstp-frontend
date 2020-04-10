import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import HomePage from "../views/HomePage";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
]

const router = new VueRouter({
  routes
})

export default router
