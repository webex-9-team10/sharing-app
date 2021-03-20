<template>
  <div>
      <h1>sign in</h1>
      <div>
          <h3>email</h3>
          <input type="text" placeholder="email" v-model="email" />
      </div>
      <div>
          <h3>password</h3>
          <input type="text" placeholder="password" v-model="password" />
      </div>
      <button @click="userSignIn">sign in</button>
      <router-link :to="{ name: 'Signup' }" >
          新規登録はこちら
        </router-link >
  </div>
</template>

<script>
import firebase from "../firebase.js";
export default {
    data:function(){
        return{
            email:"",
            password:"",
        }
    },
    methods: {
        userSignin(){
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