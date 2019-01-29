import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)
export default new Vuex.Store({
state: {
  ingreso: ''
},

actions: {
    loadingreso ({ commit }) {
      axios
        .get('http://localhost:3000/ingresos/')
        .then(r => r.data)
        .then(ingreso => {
        commit('SET_INGRESO', ingreso)
        })
    }
  },

  mutations: {
    SET_INGRESO (state, ingreso) {
      state.ingreso = ingreso
    }
  }

})
