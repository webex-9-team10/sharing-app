<template>
  <div>
      <h1>ログイン</h1>
      <div>
          <h3>email</h3>
          <input type="text" placeholder="email" v-model="email" />
      </div>
      <div>
          <h3>password</h3>
          <input type="text" placeholder="password" v-model="password" />
      </div>
      <div>
          <button v-on:click="userSignIn">sign in</button>
      </div>
      <div>
          <router-link :to="{ name: 'Signup' }" >新規登録はこちら</router-link >
      </div>

  </div>
</template>

<script>
import firebase from "firebase";
export default {
    data:function(){
        return{
            email:"",
            password:"",
        }
    },
    methods: {
        userSignIn(){
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() =>{
                    alert("success")
                    this.$router.push({ path: `/` })
                });
        }
    }
}
</script>

<style>

</style>