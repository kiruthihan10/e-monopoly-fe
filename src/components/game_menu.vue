<template>
    <div class="block">
        <div class="columns">
            <div class="column">
                <button class="button is-info" @click="new_game">
                    <strong>Create New Game</strong>
                </button>
            </div>
            <div class="column">
                <button class="button is-primary" @click="$emit('move_join')">
                    <strong>Join Game</strong>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import backend from '../assets/js/backend.js'
export default {
    mixins:[backend],
    props: ['uname','pw'],
    methods : {
        async new_game() {
            this.be_create_game(this.uname, this.pw).then((response) =>
            {
                response = response.data
                this.$emit('game',response.GameID)
            })
        }
    }
    
}
</script>