<template>
    <div class="container">
        <div class="block">
            <div class="columns">
                <div class="column">
                    <label for="UserName">User Name</label>
                    <input type="text" class="input" placeholder="Enter Your User Name Here" v-model="uname" v-on:change="new_user" required>
                </div>
                <div class="column">
                    <label for="Password">Password</label>
                    <input type="password" class="input" placeholder="Enter Your Password here" v-model="pw" required>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="columns">
                <div class="column">                   
                        <button class="button is-large is-success" :disabled='isdisabled' @click='add_user'>
                            <div v-if="page_id == 1">Sign Up</div>
                            <div v-else>Log In</div>
                        </button>
                </div>
                <div class="column">
                        <button class="button is-large is-danger" @click="$emit('move_menu')">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import backend from '../assets/js/backend.js'
    export default {
        name: 'Sign_up',
        mixins:[backend],
        emits: ['move_menu'],
        data() {
            return {
                uname: '',
                pw: '',
                isdisabled: false,
            }
        },
        props: ['page_id'],
        methods: {
            async new_user() {
                if (this.page_id == 1)
                {
                    var taken = false;
                    this.be_is_user(this.uname).then((response) =>
                    {
                        response = response.data
                        console.log(response)       
                        if (response.username == this.uname) {
                            taken = true;
                        }  
                        if (taken) {
                            this.isdisabled = true;
                        } else {
                            this.isdisabled = false;
                        }
                    }).catch((error) => {
                        this.isdisabled = false
                        console.log(error)
                    })
                }
                
            },
            async add_user() {
                if (this.page_id == 1)
                {
                    this.be_add_user(this.uname, this.pw).then((response) =>
                    {
                        response = response.data
                        console.log(response)
                        if (response.username == this.uname) {
                            this.$emit('move_menu')
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                else
                {
                    this.be_validate_user(this.uname, this.pw).then((response) =>
                    {
                        response = response.data
                        console.log(response)
                        if (response.user) {
                            this.$emit('move_game_menu')
                        }
                        else {
                            alert('Wrong User Name or Password')
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                
            }
        }
    }
</script>