<template>
    <div class="block">
        <div class="columns">
            <div class="column">
                <button class="button is-info" @click="$emit('move_create')">
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
export default {
    
}
</script>