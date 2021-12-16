<template>
    
    <div class="container">       
        <div class="block">
            <div class="columns">
                <div class="column">
                    <h3 class="is-size-4">
                        <button class="button is-success is-large" @click="$emit('move_login')">
                            Log-IN
                        </button>
                    </h3>
                </div>
                <div class="column">
                    <h3 class="is-size-4">
                        <button class="button is-large is-info" @click="$emit('move_signup')">
                            Sign-UP
                        </button>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'Welcome',
    emits: ['move_login', 'move_signup']
})
</script>
