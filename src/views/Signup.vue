<template>
  <div class="form-wrapper">
    <h1>Sign up</h1>
    <form>
      <div class="form-item">
        <label for="email"></label>
        <input
          type="email"
          name="email"
          placeholder="email"
          required="required"
          v-model="email"
        />
      </div>
      <div class="form-item">
        <label for="password"></label>
        <input
          type="password"
          name="password"
          placeholder="password"
          required="required"
          v-model="password"
        />
      </div>
      <div class="button-panel">
        <input
          type="submit"
          v-on:click="signup()"
          class="button"
          title="Sign Up"
          value="Sign Up"
        />
      </div>
      <!-- <button v-on:click="signup()">signup</button> -->
      <div class="form-footer">
        <p>
          <router-link :to="{ name: 'Signin' }">
            ログインページはこちら
          </router-link>
        </p>

        <p>
          <router-link :to="{ name: 'Home' }">
            top page
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signup: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // let uid=user.user.uid
          // firebase.firestore()
          // .collection("users")
          // .doc(uid)
          // .set({email:this.email,password:this.password})
          alert("success");
          this.$router.push({ path: `/` });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode + ":" + errorMessage);
        });
    },
  },
};
</script>

<style>
/* Fonts */
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400);

/* fontawesome */
@import url(http://weloveiconfonts.com/api/?family=fontawesome);
[class*="fontawesome-"]:before {
  font-family: "FontAwesome", sans-serif;
}

/* Simple Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* body */
body {
  background: #e9e9e9;
  height: 100%;
  color: #5e5e5e;
  font: 400 87.5%/1.5em "Open Sans", sans-serif;
}

/* Form Layout */
.form-wrapper {
  background: #fafafa;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
  height: 50%;
}

h1 {
  text-align: center;
  padding: 1em 0;
}

form {
  padding: 0 1.5em;
}

.form-item {
  margin-bottom: 0.75em;
  width: 100%;
}

.form-item input {
  background: #fafafa;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  color: #666;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  height: 50px;
  transition: border-color 0.3s;
  width: 100%;
}

.form-item input:focus {
  border-bottom: 2px solid #c0c0c0;
  outline: none;
}

.button-panel {
  margin: 2em 0 0;
  width: 100%;
}

.button-panel .button {
  background: #42b983;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.button:hover {
  background: #ee3e52;
}

.form-footer {
  font-size: 1em;
  padding: 2em 0;
  text-align: center;
}

.form-footer a {
  color: #8c8c8c;
  text-decoration: none;
  transition: border-color 0.3s;
}

.form-footer a:hover {
  border-bottom: 1px dotted #8c8c8c;
}
</style>
