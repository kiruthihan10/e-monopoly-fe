<template>
    <div class="block">
        <section class="hero is-dark">
            <div class="hero-body">
                <p class="title is-size-1">
                    e-monopoly
                </p>
                <p class="subtitle is-size-3">
                    The e-Transaction for monopoly
                </p>
            </div>
        </section>
    </div>
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
    data(){
        return {
            login_selected : false,
            signup_selected : false
        }
    },
    emits: ['move_login', 'move_signup']
})
</script>
