<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Inicio de Session</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <v-form >
                  <v-text-field v-model="usuario"
                  :rules="usuarioRules" prepend-icon="person" name="login" label="Usuario" type="text" required autofocus></v-text-field>
                  <v-text-field id="password" v-model="password"
                  :rules="passwordRules" prepend-icon="lock" name="password" label="Password" type="password" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import firebase from 'firebase'
  export default {
    data: () => ({
      drawer: null,
      password: '',
      passwordRules: [
        v => !!v || 'Password requerido',
      ],
      usuario: '',
      usuarioRules: [
        v => !!v || 'Usuario requerido',
      ]
    }),
    methods:{
      login(){
      firebase.auth().signInWithEmailAndPassword(this.usuario, this.password)
      .then((User)=> this.$router.replace('/ingreso'))
    }
    }
  }
</script>
