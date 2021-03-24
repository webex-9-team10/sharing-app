<template>
  <div class="form__wrapper">
    {{ position }}
    <div>
      <label
        >ファイルを選択
        <input type="file" />
      </label>
      <span id="file_name"
        >sample.csv <span class="reset_file_ico">×</span></span
      >
      <p id="error">csv ファイルのみアップロード可能です</p>
    </div>
    <select v-model="genre">
      <option disabled value="">ジャンルの選択</option>
      <option>food</option>
      <option>museum</option>
      <option>date</option>
      <option>chill</option>
      <option>cafe</option>
    </select>
    <div>
      <input type="text" v-model="title" placeholder="title" />
    </div>
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="キャプションを書く"
    />
    <div class="form__buttons">
      <button v-on:click="checkStatus" class="form__submit-button">
        投稿
      </button>
    </div>
    <div v-for="tweet in tweets" :key="tweet.id">
      <router-link :to="{ name: 'Show', params: { postid: tweet.id } }">
        {{ tweet.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import router from "../router"

export default {
  data() {
    return {
      name: "FileInput",
      genre: "",
      title: "",
      text: "",
      positionData: {
        lat: Number(this.position.lat),
        lng: Number(this.position.lng),
      },
      tweets: [],
    };
  },
  props: ["position"],
  methods: {
    checkStatus: function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          alert("ログインしてね")
          router.push({ name: `Signup` })
          return
        }
      });
      const item = {
        genre: this.genre,
        title: this.title,
        text: this.text,
        liked: 0,
        infowindow: false,
        positionData: {
          lat: this.positionData.lat,
          lng: this.positionData.lng,
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userid:firebase.auth().currentUser.uid,
      };
      firebase
        .firestore()
        .collection("tweets")
        .add(item);

      this.$router.push({ name: `Home` });
    },
  },
  mounted: function() {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.tweets.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      });
  },
};
</script>

<style scoped>
.form__wrapper {
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #1c1b1b;
  background: #fafafa;
  line-height: 1.65;
  box-sizing: border-box !important;
  -webkit-font-smoothing: antialiased;
}
.form__textarea {
  font-family: "Nunito Sans", sans-serif;
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
  justify-content: center;
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #fff;
  background: #9ec34b;
  border-bottom: solid 6px #dfe9e7;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  opacity: 0.9;
}
.form__textarea:focus {
  outline: none;
}
/* 投稿ボタン */
.form__buttons {
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  justify-content: flex-end;
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid #9ec34b;
  font-size: 16px;
  color: #9ec34b;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  transition: 0.4s;
}
/* ホバー時に色チェンジ */
.form__buttons:hover {
  background-color: #9ec34b;
  border-color: #cbe585;
  color: #fff;
}
label {
  font-family: "Nunito Sans", sans-serif;
  font-size: 12px;
  padding: 2px 3px;
  border: 1px solid #c6c6c6;
}
label:hover {
  cursor: pointer;
  background-color: #cbdada;
}
label input {
  display: none;
}
#file_name {
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  margin-left: 20px;
}
.reset_file_ico {
  padding: 4px;
  font-size: 12px;
  border: 1px solid #c6c6c6;
  border-radius: 10px;
}
.reset_file_ico:hover {
  cursor: pointer;
  border-color: #5f6674;
}
#error {
  font-family: "Nunito Sans", sans-serif;
  color: red;
}
</style>
