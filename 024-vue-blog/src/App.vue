<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
  <span class="navbar-brand" href="#">Vue Blog</span>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link class="nav-item nav-link" to="/">Home</router-link>
        <router-link class="nav-item nav-link" to="/admin">Admin</router-link>
    </div>
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
