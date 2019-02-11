<template>
  <div id="app" app-data="true">
    <app-toolbar></app-toolbar>
    <router-view/>
    <app-footer ></app-footer>
<!--style="position:absolute;z-index:-1" -->
  </div>
</template>

<script>
import AppToolbar from './components/AppToolbar'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',
  components:{AppFooter,AppToolbar}

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
