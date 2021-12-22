<template>
    <div class="block" name="Player Info" v-if="Banker != null">
        <div class="columns">
            <div class="column">
                Banker of the Game {{game_id}} is {{Banker}}
            </div>
            <div class="column" >
                {{uname}}
            </div>
            <div class="column">
                Your Current Cash Value @ {{player_value()}}$
            </div>
        </div>
        <div class="block">
            <progress class="progress" v-bind:value='player_value()' v-bind:max='total_money' :class="color_choice(player_value())"></progress>
        </div>
    </div>
    
    <div class="block" v-for="player in players_without_banker" :key="player.name">
        <div class="columns is-mobile">
            <div class="column is-one-fifth" >
                {{player.name}}
            </div>
            <div class="column is-one-fifth">
                {{player.value}}$
            </div>
            <div class="column">
                <progress class="progress" v-bind:value='player.value' v-bind:max='total_money' :class="color_choice(player.value)"></progress>
            </div>
        </div> 
    </div>
</template>

<script>
import backend from '../assets/js/backend.js'
const {std, mean} = require('mathjs')
export default {
    mixins:[backend],
    props:['game_id','uname','pw'],
    data(){
        return {
            players: [],
            Banker: null
        }
    },
    methods : {
        async load_info() {
            this.be_game_info(this.uname, this.pw, this.game_id).then((response) => {
                response = response.data
                this.Banker = response.Banker
                this.players = response.players
                console.log(response)
                console.log(this.Banker)
            })
        },
        calc_total_money(){
            var total = 0
            for (let i = 0 ;i < this.players.length; i++)
            {
                if (this.players[i].name != this.Banker)
                {
                    total += this.players[i].value
                }
            }
            return total
        },
        color_choice(value){
            var values = this.values_extract()
            const min_thresh = -1
            const max_thresh = 1
            if (std(values)!=0){var value_in_percentage = (value-mean(values))/std(values)}else{value_in_percentage = value}
            var danger = (value_in_percentage<min_thresh)
            var neutral = (value_in_percentage>min_thresh & value_in_percentage < max_thresh)
            var good = (value_in_percentage > max_thresh)
            return {
                'is-success':good,
                'is-warning':neutral,
                'is-danger':danger
            }
        },
        values_extract()
        {
            if (this.players.length > 0){
                var values_arr = new Array(this.players.length -1)
                var j = 0
                for (let i = 0 ;i < this.players.length; i++)
                {
                    if (this.players[i].name != this.Banker)
                    {
                        values_arr[i-j] = this.players[i].value
                    }
                    else {
                        j += 1
                    }
                }
                console.log(values_arr)
                return values_arr
            }
            else {
                return []
            }
        },
        player_value()
        {
            for (let i = 0 ;i < this.players.length; i++)
            {
                if (this.players[i].name == this.uname)
                {
                    return this.players[i].value
                }
            }
            return 0
        }
    },
    async created() {
        await this.load_info()
    },
    computed: {
        total_money() {
            return this.calc_total_money()
        },
        players_without_banker(){
            if (this.players.length > 0)
            {
                var players_without_banker_list = new Array(this.players.length-2)
                var j = 0
                for (let i = 0 ;i < this.players.length; i++)
                {
                    if (this.players[i].name != this.Banker & this.players[i].name != this.uname)
                    {
                        players_without_banker_list[i-j] = this.players[i]
                    }
                    else {
                        j += 1
                    }
                }
                return players_without_banker_list
            }
            else {return this.players}
        },
    }
}
</script>