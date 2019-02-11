// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)
import store from './store/store'
Vue.config.productionTip = false

/* eslint-disable no-new */
import firebase from 'firebase'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD8ukAX0M8oKh6CGJjdAPN6hmit4U6BwqI",
    authDomain: "vencidos-57373.firebaseapp.com",
    databaseURL: "https://vencidos-57373.firebaseio.com",
    projectId: "vencidos-57373",
    storageBucket: "vencidos-57373.appspot.com",
    messagingSenderId: "336803632384"
  };
  firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
});
