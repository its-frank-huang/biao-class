<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-info">
  <span class="navbar-brand text-white" href="#">Vue Blog</span>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link class="nav-item nav-link text-white" to="/">Home</router-link>
        <router-link class="nav-item nav-link text-white" to="/admin/post">Admin</router-link>
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
