const base_url = 'http://127.0.0.1:8000'
const base_user_url = base_url + '/users/users/'

function create_auth(uid, pw){
   return {auth:{username:uid,password:pw}}
}

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
      },
      async be_create_game(uid,pw) {
         return await this.axios.post(base_url+'/transactions/games/', {},{auth:{username:uid,password:pw}})
      },
      async be_get_my_games(uid, pw) {
         return await this.axios.get(base_url+'/transactions/players/', create_auth(uid, pw))
      },
      async be_game_info(uid, pw, game_id) {
         return await this.axios.get(base_url+'/transactions/games/'+game_id+"/", create_auth(uid, pw))
      },
      async be_join_game(uid, pw, game_id) {
         return await this.axios.post(
            base_url+'/transactions/players/',
            {
               'Game': game_id,
            },create_auth(uid, pw))
      },
   }
}