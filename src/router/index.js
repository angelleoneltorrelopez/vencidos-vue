import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
import AppLogin from '@/components/AppLogin'
import AppCasas from '@/components/AppCasas'
import AppProveedores from '@/components/AppProveedores'
import AppIngreso from '@/components/AppIngreso'
import AppProductos from '@/components/AppProductos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    },
    {
      path: '/login',
      name: 'AppLogin',
      component: AppLogin
    },
    {
      path: '/ingreso',
      name: 'AppIngreso',
      component: AppIngreso
    },
    {
      path: '/productos',
      name: 'AppProductos',
      component: AppProductos
    },
    {
      path: '/casas',
      name: 'AppCasas',
      component: AppCasas
    },
    {
      path: '/proveedores',
      name: 'AppProveedores',
      component: AppProveedores
    }
  ]
})
