<template>
  <div>
      <div>
          <div>email</div>
          <input type="text" v-model="email">
      </div>
      <div>
          <div>password</div>
          <input type="text" v-model="password">
      </div>
      <button v-on:click="signup()">signup</button>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
    data:function(){
        return{
            email:"",
            password:"",
        }
    },
    methods:{
        signup:function(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                firebase.firestore().collection("users").doc(user.uid).add({email:this.email,password:this.password})
                alert("ようこそ")
                this.$router.push({ path: `/` })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + ":" + errorMessage)
            });
        },
    }

}
</script>

<style>

</style>