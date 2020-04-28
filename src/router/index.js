import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import Register from "../views/Register";
import UserCenter from "../views/UserCenter";
import NewGoods from "../views/NewGoods";
import EditGoods from "../views/EditGoods";
import GoodsDisplay from "../views/GoodsDisplay";
import OrderDisplay from "../views/OrderDisplay";

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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user_center',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/new_goods',
      name: 'NewGoods',
      component: NewGoods
    },
    {
      path: '/edit_goods/:id',
      name: 'EditGoods',
      component: EditGoods
    },
    {
      path: '/goods_display/:id',
      name: 'GoodsDisplay',
      component: GoodsDisplay
    },
    {
      path: '/order_display/:id',
      name: 'OrderDisplay',
      component: OrderDisplay
    }
]

const router = new VueRouter({
  routes
})

export default router
