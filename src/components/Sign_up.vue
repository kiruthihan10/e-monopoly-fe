<template>
    <div class="modal" :class="{'is-active': isactive}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title" v-if='signup == true'>Sign Up</p>
                <p class="modal-card-title" v-else>Log In</p>
                <button class="delete" aria-label="close" @click="deactive()"></button>
            </header>
            <section class="modal-card-body">
                <div class="block">
                    Login
                    <label class="switch">
                        <input type="checkbox" v-model="signup" @click="toggle">
                        <span class="slider round"></span>
                    </label>
                    Signup
                </div>
                <div class="block">
                    <label for="UserName">User Name</label>
                    <input type="text" class="input" placeholder="Enter Your User Name Here" v-model="uname" v-on:change="new_user" required @keyup.enter="add_user">
                </div>
                <div class="block">
                    <label for="Password">Password</label>
                    <input type="password" class="input" placeholder="Enter Your Password here" v-model="pw" required @keyup.enter="add_user">
                </div>
                <div class="notification" v-for="message in messages" :key="message.time" @click="remove_message(message.time)">
                    <button class="delete" @click='remove_message'></button>
                    {{message.message}}
                </div>
            <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
                <div class="columns">
                    <div class="column">                   
                        <button class="button is-large is-success" :disabled='isdisabled' @click='add_user'>
                            <div v-if="signup == true">Sign Up</div>
                            <div v-else>Log In</div>
                        </button>
                    </div>
                    <div class="column">
                            <button class="button is-large is-danger" @click="deactive">Cancel</button>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
    import backend from '../assets/js/backend.js'
    import messages from '../assets/js/messages.js'
    export default {
        name: 'Sign_up',
        mixins:[
            backend,
            messages
        ],
        emits: ['move_menu','move_game_menu'],
        data() {
            return {
                uname: '',
                pw: '',
                isdisabled: false,
                isactive: true,
                signup: true
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
                if (this.signup == true)
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
                            this.$emit('move_game_menu',this.uname,this.pw)
                        }
                        else {
                            this.add_message('Wrong User Name or Password', false)
                            // alert('Wrong User Name or Password')
                        }
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                
            },
            deactive() {
                this.is_active = false
                this.$emit('move_menu')
            },
            toggle() {
                this.signup = !this.signup
            },
        },
        created() {
            this.signup = this.page_id == 1
        }
    }
</script>

<style>
    /* The switch - the box around the slider */
    .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
    opacity: 0;
    width: 0;
    height: 0;
    }

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #2196F3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    }
</style>