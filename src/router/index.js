import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
import AppLogin from '@/components/AppLogin'
import AppCasas from '@/components/AppCasas'
import AppProveedores from '@/components/AppProveedores'
import AppIngreso from '@/components/AppIngreso'
import AppProductos from '@/components/AppProductos'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
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
      component: AppIngreso,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/productos',
      name: 'AppProductos',
      component: AppProductos,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/casas',
      name: 'AppCasas',
      component: AppCasas,
      meta: {
        autentificado: true
      }
    },
    {
      path: '/proveedores',
      name: 'AppProveedores',
      component: AppProveedores,
      meta: {
        autentificado: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizacion = to.matched.some(record => record.meta.autentificado);
  if(autorizacion && !usuario){
    next('login');
  } else if(!autorizacion && usuario){
    next('/');
  } else {
    next();
  }
})

export default router;
