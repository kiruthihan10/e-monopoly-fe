<template>
  <welcome v-if="page_id == 0" @move_login='page_id=2' @move_signup='page_id=1'></welcome>
  <Sign_up v-if="page_id == 1 | page_id == 2" :page_id="page_id" @move_menu='page_id=0' @move_game_menu='page_id=3'></Sign_up>
</template>

<script>
  import Welcome from './components/Welcome.vue'
  import Sign_up from './components/Sign_up.vue'

  // import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  // import Vue from 'vue'
  // Vue.use(BootstrapVue)
  // Vue.use(IconsPlugin)
  // Page_id: 0: Welcome, 1: Sign_up, 2: Log_in, 3: Game_menu
  export default {
    name: 'App',
    components: {
      Welcome,
      Sign_up
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
