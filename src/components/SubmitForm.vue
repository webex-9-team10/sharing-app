<template>
  <section id="contact">
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
                <label
                  >ファイルを選択
                  <input type="file" />
                </label>
              </div>
              <!-- ファイルのみアップロード可能です -->
              <div class="onlyfile">
                <span id="file_name"
                  >sample.csv <span class="reset_file_ico">×</span></span
                >
                <p id="error">csv ファイルのみアップロード可能です</p>
              </div>
            </div>
            <!-- ジャンル選択画面 -->
            <div class="form-control">
              <select v-model="genre">
                <option disabled value="">ジャンルの選択</option>
                <option>food</option>
                <option>museum</option>
                <option>date</option>
                <option>chill</option>
                <option>cafe</option>
              </select>
            </div>
            <!-- タイトル選択画面 -->
            <div class="chooseTitle">
              <input type="text" v-model="title" placeholder="title" />
            </div>
            <!-- キャプション画面 -->
            <div class="caption">
              <textarea
                class="form-control"
                v-model="text"
                placeholder="キャプションを書く"
              />
            </div>
            <!-- 投稿ボタン -->
            <div class="form__buttons">
              <button v-on:click="checkStatus" class="form__submit-button">
                POST
              </button>
            </div>
            <div v-for="tweet in tweets" :key="tweet.id">
              <router-link :to="{ name: 'Show', params: { postid: tweet.id } }">
                {{ tweet.text }}
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
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
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.contact {
  width: 100%;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}

.section-header {
  text-align: center;
  margin: 0 auto;
  padding: 40px 0;
  font: 300 60px "Nunito Sans", sans-serif;
  letter-spacing: 6px;
  color: #5f6674;
}

.contact-wrapper {
  margin: 0 auto;
  padding-top: 20px;
  position: relative;
  max-width: 800px;
  font-family: sans-serif;
}

/* Begin Left Contact Page */
.form-horizontal {
  text-align: center;
  flex-direction: column;
  color: #5f6674;
  font-family: "Lato";
}

.chooseFile {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.onlyfile {
  color: #5f6674;
}

textarea.form-control {
  width: 90%;

  color: #5f6674;

  letter-spacing: 1px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 50px;
  padding: 12px 12px;
  font-size: 14px;
}

.caption {
  padding: 10px 18px;
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

/* 投稿ボタン */
.form__buttons {
  font-family: "Nunito Sans", sans-serif;
  display: flex;
  justify-content: flex-end;
  display: inline-block;
  max-width: 180px;
  text-align: left;
  border: 2px solid white;
  font-size: 16px;
  color: white;
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
  color: #fff;
}
</style>
