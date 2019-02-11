<template>
  <nav>
  <v-toolbar color="indigo" dark>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/">
        <v-btn flat>{{title}}</v-btn>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div >
      <router-link to="/ingreso">
        <v-btn flat >Ingreso</v-btn>
      </router-link>
      <router-link to="/productos">
        <v-btn flat>Productos</v-btn>
      </router-link>
      <router-link to="/casas">
        <v-btn flat>Casas</v-btn>
      </router-link>
      <router-link to="/proveedores">
        <v-btn flat>Proveedores</v-btn>
      </router-link>
      <router-link to="/login">
        <v-btn flat>Login</v-btn>
      </router-link>

      <v-btn icon  @click="logout()">
          <v-icon >logout</v-icon>
        </v-btn>
    </div>
  </v-toolbar>


  <div >
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
  >
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>John Leider</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" router :to="item.route"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
  export default {
    data () {
      return {
        drawer: false,
        title: 'Vencidos',
        items: [
          { title: 'Ingreso', icon: 'dashboard', route: '/ingreso' },
          { title: 'Productos', icon: 'question_answer', route: '/productos' },
          { title: 'Casas', icon: 'dashboard', route: '/casas' },
          { title: 'Proveedores', icon: 'question_answer', route: '/proveedores' },
          { title: 'Login', icon: 'dashboard', route: '/login' },
        ]
      }
    },
    methods: {
      logout(){
        firebase.auth().signOut().then(()=> this.$router.replace('/login')).catch(function(error) {
    alert('error')
  });

    }
    }

  }
</script>
