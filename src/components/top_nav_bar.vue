<template>
    <div class="block">
        <section class="hero is-dark" v-if="page_id==0">
            <div class="hero-body has-text-centered">
                <p class="title is-size-1">
                    e-monopoly
                </p>
            </div>
        </section>
    
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <h1 class="is-size-3 has-text-black">
                    e-monopoly
                </h1>
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navBarBasicExample" class="navbar-menu" v-bind:class="{ 'is-active' : showNav }">
                <div class="navbar-start">
                    <a class="navbar-item" @click="$emit('move_create')" v-if='page_id != 0 & page_id != 1 & page_id != 2'>
                        Create
                    </a>
                    <a class="navbar-item" @click="$emit('Move_Join')" v-if='page_id != 0 & page_id != 1 & page_id != 2'>
                        Join
                    </a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item" v-if='page_id == 0'>
                        <div class="buttons">
                            <a class="button is-primary" @click="$emit('move_signup')">
                                <strong>Sign up</strong>
                            </a>
                            <a class="button is-light" @click="$emit('move_login')">
                                Log in
                            </a>
                        </div>
                    </div>
                    <div class="navbar-item" v-else-if='page_id !=1 & page_id != 2'>
                        <a class="button is-danger" @click="$emit('logout')">
                            <strong>Log-out</strong>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <div class="block" name="home_page_info" v-if="page_id==0">
        <p class="subtitle is-size-3">
            The e-Transaction for monopoly
        </p>
    </div>
</template>

<script>
export default {
    props: ['page_id'],
    data(){
        return {
        showNav : false
        }
    } 
}
</script>