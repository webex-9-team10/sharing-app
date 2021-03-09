<template>
  <div class="form__wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="キャプションを書く"
    />
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">
        投稿
      </button>
    </div>
    <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      text:"",
      tweets: [ ],
    }
  },
  methods: {
    postTweet() {
      firebase.firestore().collection("tweets").add({
        text: this.text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      this.tweets.length=0
      firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log(doc)
          this.tweets.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
    },
  },
  mounted: function(){
      firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
            this.tweets.push({
            id: doc.id,
            ...doc.data()
          });
      });
      });
  },
}
</script>

<style scoped>
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>