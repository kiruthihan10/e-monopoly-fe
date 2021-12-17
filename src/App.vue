<template>
  <div class="block" name="Navbar">
    <top_nav_bar :page_id='page_id'></top_nav_bar>
  </div>
<div class="container"> 

  <div class="block" name="Welcome Page">
    <welcome v-if="page_id == 0" @move_login='page_id=2' @move_signup='page_id=1'></welcome>
  </div>
  <div class="block" name="Login And Signup Page">
    <Sign_up v-if="page_id == 1 | page_id == 2" :page_id="page_id" @move_menu='page_id=0' @move_game_menu='open_game_menu'></Sign_up>
  </div>
</div>
</template>

<script>
  import Welcome from './components/Welcome.vue'
  import Sign_up from './components/Sign_up.vue'
  import top_nav_bar from './components/top_nav_bar.vue'

  // import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
  // import Vue from 'vue'
  // Vue.use(BootstrapVue)
  // Vue.use(IconsPlugin)
  // Page_id: 0: Welcome, 1: Sign_up, 2: Log_in, 3: Game_menu
  export default {
    name: 'App',
    components: {
      Welcome,
      Sign_up,
      top_nav_bar
    },
    data() {
      return {
        page_id : 0,
        uname : null,
        pw : null,
      }
    },
    methods: {
      open_game_menu(uname, pw) {
        this.page_id = 3
        this.uname = uname
        this.pw = pw
      }
    }
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
