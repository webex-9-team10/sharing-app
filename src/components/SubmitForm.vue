<template>
  <div class="form__wrapper">
    <div>
        <label>ファイルを選択
            <input type="file">
        </label> <span id="file_name" >sample.csv <span class="reset_file_ico">×</span></span>
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
    <input
      type="text"
      v-model="title"
      placeholder="title"
    />
    </div>
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
    <div v-for="tweet in tweets" :key="tweet.id">
        <router-link :to="{ name: 'Show', params: { postid : tweet.id  }}" >
            {{ tweet.text }}
        </router-link >
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      name: "FileInput",
      genre:"",
      title:"",
      text:"",
      //position:{},
      tweets: [ ],
    }
  },
  methods: {
    postTweet() {
      const item = {
        genre:this.genre,
        title:this.title,
        text:this.text,
        //position:{lat: this.lat, lng:this.lng},
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
      firebase.firestore().collection("tweets").add(item)
      this.tweets.length=0

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
label {
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
        color: red;
    }
</style>