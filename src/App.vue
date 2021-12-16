<template>
  <welcome v-if="page_id == 0" @move_login='page_id=2' @move_signup='page_id=1'></welcome>
</template>

<script>
  import Welcome from './components/Welcome.vue'

  // import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  // import Vue from 'vue'
  // Vue.use(BootstrapVue)
  // Vue.use(IconsPlugin)
  
  export default {
    name: 'App',
    components: {
      Welcome
    },
    data() {
      return {
        page_id : 0
      }
    },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
