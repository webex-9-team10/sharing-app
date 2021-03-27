<template>
  <form>
    <h1 class="section-header">Let's post!</h1>
    <div class="form__wrapper">
      <div class="contact-wrapper">
        <form id="contact-form" class="form-horizontal" role="form">
          <!-- 緯度経度の情報持ってくる -->
          {{ position }}
          <!-- ファイル選択画面 -->
          <div class="form-group">
            <div class="form-control">
              <!-- ファイルを選択 -->
              <div class="chooseFile">
                <input type="file" name="file" placeholder="file" />
              </div>
              <!-- ファイルのみアップロード可能です -->
              <div class="onlyfile">
                <span id="file_name"
                  >sample.csv <span class="reset_file_ico">×</span></span
                >
                <p id="error">csv ファイルのみアップロード可能です</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <!-- ジャンル選択画面 -->

      <select v-model="genre" class="genre">
        <option disabled value="">ジャンルの選択</option>
        <option>food</option>
        <option>museum</option>
        <option>date</option>
        <option>chill</option>
        <option>cafe</option>
      </select>

      <!-- タイトル選択画面 -->
      <input
        name="title"
        type="text"
        class="feedback-input"
        v-model="title"
        placeholder="title"
      />
      <!-- キャプション画面 -->
      <div class="caption">
        <textarea
          class="feedback-input"
          v-model="text"
          placeholder="キャプションを書く"
        />
      </div>
      <!-- 投稿ボタン -->
      <input
        type="submit"
        value="SUBMIT"
        v-on:click="checkStatus"
        class="form__submit-button"
      />
      <div v-for="tweet in tweets" :key="tweet.id">
        <router-link :to="{ name: 'Show', params: { postid: tweet.id } }">
          {{ tweet.text }}
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
import firebase from "firebase";
import router from "../router";

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
    checkStatus: function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          alert("ログインしてね");
          router.push({ name: `Signup` });
          return;
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
        userid: firebase.auth().currentUser.uid,
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
.section-header {
  text-align: center;
  margin: 0 auto;
  padding: 0;
  font: 300 60px "Open Sans", sans-serif;
  letter-spacing: 6px;
  color: #5e5e5e;
  border-bottom: solid 3px #5e5e5e;
}

body {
  background: rgb(30, 30, 40);
}
form {
  max-width: 630px;
  margin: 50px auto;
}
#contact-form {
  padding-top: 10px;
}
.chooseFile {
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border: 2px solid #5e5e5e;
  transition: all 0.3s;
  padding: 7px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
}
/* キャプションを書く画面 始まり */
.genre {
  font-family: "FontAwesome", sans-serif;
  font-weight: 500;
  font-size: 13px;
  border-radius: 5px;
  line-height: 8px;
  background-color: transparent;
  border: 2px solid #5e5e5e;
  transition: all 0.3s;
  padding: 12px;
  margin-bottom: 15px;
  width: 40%;
  box-sizing: border-box;
  outline: 0;
}
.feedback-input {
  color: rgb(12, 10, 10);
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 18px;
  border-radius: 5px;
  line-height: 22px;
  background-color: transparent;
  border: 2px solid #5e5e5e;
  transition: all 0.3s;
  padding: 13px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
  outline: 0;
}

.feedback-input:focus {
  border: 2px solid #5e5e5e;
}

textarea {
  height: 150px;
  line-height: 150%;
  resize: vertical;
  color: #5e5e5e;
}
.send-button {
  margin-top: 15px;
  height: 34px;
  width: 400px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
}

.button {
  width: 400px;
  height: auto;
  transition: all 0.2s ease-in-out;
}

.send-text {
  display: block;
  margin-top: 10px;
  font: 700 12px "Lato", sans-serif;
  letter-spacing: 2px;
}

.button:hover {
  transform: translate3d(0px, -29px, 0px);
}
/* キャプションを書く画面 終わり */

/* 投稿ボタン  始まり*/
[type="submit"] {
  font-family: "Open Sans", sans-serif;
  width: 100%;
  background: #42b983;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  margin-top: -4px;
  font-weight: 700;
  margin-bottom: 40px;
}

[type="submit"]:hover {
  background: #cc4949;
}
/* 投稿ボタン 終わり */

/* label {
  font-family: "Open Sans", sans-serif;
  padding: 2px 3px;
  border: 1px solid #c6c6c6;
}
label:hover {
  cursor: pointer;
  background-color: #cbdada;
}
label input {
  display: none;
} */
#file_name {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  margin-left: 20px;
}

#error {
  font-family: "Open Sans", sans-serif;
  color: #5e5e5e;
}
</style>
