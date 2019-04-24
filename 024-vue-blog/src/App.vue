<template>
  <div id="app">
      <h1>vue</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/admin">Admin</router-link>
      </nav>
      <router-view></router-view>
  </div>
</template>

<script>

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
