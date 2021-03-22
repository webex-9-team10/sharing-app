<template>
  <div class="form__wrapper">
    <div>
      {{ file.name }}
        <label>ファイルを選択
            <input v-on:change="changeFile" ref="file" type="file">
        </label> <span id="file_name" >sample.csv <span class="reset_file_ico">×</span></span>
        <p id="error">csv ファイルのみアップロード可能です</p>
        <button v-on:click="saveImage()">save</button>
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
      file:{},
      positionData: { lat: Number(this.position.lat), lng: Number(this.position.lng) },
      tweets: [],
    }
  },
  props:["position"],
  methods: {
    postTweet() {
      const item = {
        genre:this.genre,
        title:this.title,
        text:this.text,
        infowWindow:false,
        liked: 0,
        positionData: { lat: this.positionData.lat, lng: this.positionData.lng },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }
      firebase.firestore().collection("tweets").add(item)
      this.$router.push({ name: `Home`});
    },
    changeFile:function(e){
      const files = e.target.files || e.dataTransfer.files
      
      this.file = files[0]
    },
    saveImage:function(){
      firebase
       .storage()
       .ref()
       .child('images/' + this.file.name)
       .put(this.file).then(function() {
          console.log('Uploaded a blob or file!');
      });
    }
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