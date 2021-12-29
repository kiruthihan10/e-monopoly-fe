<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="block">
                    <label>Enter Game ID to Join</label>
                </div>
            </header>
            <section class="modal-card-body">
                <div class="block">
                    <input type="number" class="input is-rounded" placeholder="Enter Game ID here or select from below" v-model='game_id' v-on:change='game_check'>
                </div>
                <div class="block">
                    <strong>Wanna Continue your Old Game</strong>
                </div>
                <div class="block">
                    <div class="select is-multiple">
                        <select multiple v-model="selected_game_id" @change='change_game_id'>
                            <option v-for="game in games" :key="game.GameID" v-bind:value="game.GameID">  
                                <div v-if="game.last_player != null">
                                    {{game.last_player.slice(8,10)}}
                                    {{game.last_player.slice(5,7)}}
                                    {{game.last_player.slice(0,4)}}
                                </div>
                                {{game.Title}}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="block">
                    <button class="button is-success" :disabled='isdisabled' @click='join'>
                        Join!!!
                    </button>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-info" @click="new_game">
                    <strong>Create New Game</strong>
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import backend from '../assets/js/backend.js'
export default {
    mixins:[backend],
    props: ['uname','pw'],
    methods: {
        async load_games(){
            this.be_get_my_games(this.uname,this.pw).then((response) => {
                this.games= response.data
            })
        },
        async change_game_id() {
            this.game_id = this.selected_game_id[0]
            this.game_check()
        },
        async game_check() {
            this.be_game_info(this.uname, this.pw, this.game_id).then((response) =>{
                this.isdisabled = false
                console.log(response)
            }).catch((error)=>{ 
                if (error.response.status == 404)
                {
                    this.isdisabled = true
                }
            })
            return this.isdisabled
        },
        async join(){
            this.be_join_game(this.uname, this.pw, this.game_id).then((response) => {
                console.log(response)
                this.$emit('join',this.game_id)
            }).catch((error) => {
                if (error.response.status == 400) {
                    alert(error.response.data.error)
                    this.$emit('join',this.game_id)
                }
                else if (error.response.status == 404){
                    alert("Game not found")
                }
            })
            
        },
        async new_game() {
            this.be_create_game(this.uname, this.pw).then((response) =>
            {
                response = response.data
                this.$emit('game',response.GameID)
            })
        }
    },
    data() {
        return {
            games : [],
            selected_game_id : null,
            game_id: null,
            isdisabled : true
        }
    },
    created() {
        this.load_games()
    }
}
</script>