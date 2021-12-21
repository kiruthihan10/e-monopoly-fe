<template>
<div class="block">
    <label>Enter Game ID to Join</label>
</div>
<div class="block">
    <input type="number" class="input is-rounded" placeholder="Enter Game ID here or select from below" v-model='game_id' v-on:change='game_check'>
</div>
<div class="block">
    <strong>Wanna Continue your Old Game</strong>
</div>
<div class="block">
    <div class="select is-multiple">
        <!-- <select multiple>
            <option>Apple</option>
            <option>Orange</option>
            <option>Peach</option>
        </select> -->
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
    <button class="button" :disabled='isdisabled' @click='join'>
        Join!!!
    </button>
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
            this.be_is_game(this.uname, this.pw, this.game_id).then((response) =>{
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
        join(){
            this.$emit(this.game_id)
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