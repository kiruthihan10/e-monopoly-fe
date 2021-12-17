const base_url = 'http://127.0.0.1:8000'
const base_user_url = base_url + '/users/users/'

export default {
   methods: {
      async be_get_users() {
         return await this.axios.get(base_user_url)
      },
      async be_is_user(uid) {
         return await this.axios.get(base_user_url+uid+"/")
      },
      async be_add_user(uid,pw) {
         return await this.axios.post(base_user_url, {
            username: uid,
            password: pw
         })
      },
      async be_validate_user(uid,pw) {
         return await this.axios.get(base_url+'/users/auth/'+uid+'/validate/?password='+pw)
      }
   }
}