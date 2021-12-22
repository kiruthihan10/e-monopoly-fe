<template>
  <div class="block" name="Navbar">
    <top_nav_bar :page_id='page_id' @move_create='page_id=4' @move_join='page_id=4' @move_login='page_id=2' @move_signup='page_id=1' @logout='logout' />
  </div>
  <div class="container"> 
    <div class="block" name="Welcome Page">
      <welcome v-if="page_id == 0" @move_login='page_id=2' @move_signup='page_id=1'></welcome>
    </div>
    <div class="block" name="Login And Signup Page">
      <Sign_up v-if="page_id == 1 | page_id == 2" :page_id="page_id" @move_menu='page_id=0' @move_game_menu='open_game_menu'></Sign_up>
    </div>
    <div class="block" name="Game Menu">
      <game_menu v-if="page_id == 3" @move_create='page_id=4' @move_join='page_id=4' :uname="uname" :pw="pw" @game='game_info'/>
    </div>
    <div class="block" name="play_game">
      <play_game :game_id="game_id" :uname="uname" :pw="pw" v-if="page_id == 5"/>
    </div>
    <div class="block" name="join_game">
      <join_game v-if="page_id == 4" :uname="uname" :pw="pw" @join='game_info'/>
    </div>
  </div>
</template>

<script>
  import Welcome from './components/Welcome.vue'
  import Sign_up from './components/Sign_up.vue'
  import top_nav_bar from './components/top_nav_bar.vue'
  import game_menu from './components/game_menu.vue'
  import play_game from './components/play_game.vue'
  import join_game from './components/join_game.vue'

  // Page_id: 0: Welcome, 1: Sign_up, 2: Log_in, 3: Game_menu, 4: Join, 5: Play_Game
  export default {
    name: 'App',
    components: {
      Welcome,
      Sign_up,
      top_nav_bar,
      game_menu,
      play_game,
      join_game
    },
    data() {
      return {
        page_id : 5,
        uname : 'Batman',
        pw : 'Alfred',
        game_id: 4,
      }
    },
    methods: {
      open_game_menu(uname, pw) {
        this.page_id = 3
        this.uname = uname
        this.pw = pw
      },
      logout() {
        this.page_id = 0
        this.uname = null
        this.pw = null
      },
      game_info(game_id) {
        this.game_id = game_id
        this.page_id = 5
      },
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
