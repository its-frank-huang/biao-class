<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app a{
  display: inline-block;
  margin-right: .5em;
}
</style>
