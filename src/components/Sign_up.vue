<template>
    <div class="container">
        <div class="block">
            <div class="columns">
                <div class="column">
                    <label for="UserName">User Name</label>
                    <input type="text" class="input" placeholder="Enter Your User Name Here" v-model="uname" v-on:change="new_user">
                </div>
                <div class="column">
                    <label for="Password">Password</label>
                    <input type="password" class="input" placeholder="Enter Your Password here" v-model="pw">
                </div>
            </div>
        </div>
        <div class="block">
            <div class="columns">
                <div class="column">                   
                        <button class="button is-large is-success" :disabled='isdisabled'>
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
export default {
    name: 'Sign_up',
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
        new_user() {
            var taken = false;
            this.axios.get('http://127.0.0.1:8000/users/users/').then((response) => {
                if (this.page_id == 1) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].username == this.uname) {
                            taken = true;
                            alert('User Name Already Exists')
                            break
                        }
                    }
                    if (taken){
                        this.isdisabled=true
                    }
                    else{
                        this.isdisabled=false
                    }
                }
            }).catch(function (error) {
                if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                }
                console.log(error.config);
            });
        }
    }
}
</script>