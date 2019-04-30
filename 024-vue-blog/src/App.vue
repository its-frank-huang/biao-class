<template>
  <div id="app">
      <nav calss="navbar navbar-light bg-light">
        <div class="navbar-brand">
          Vue Blog
        </div>
        <div class="navbar-nav">
        <router-link class="nav-item nav-link" to="/">Home</router-link>
        <router-link class="nav-item nav-link" to="/admin">Admin</router-link>
        </div>
      </nav>
      <router-view></router-view>
  </div>
</template>

<script>
import './css/app.css';
import './css/global.css';
import './css/bootstrap.css';

export default {
  name: 'app',
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
 
}
</style>
