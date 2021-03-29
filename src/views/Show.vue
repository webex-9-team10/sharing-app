<template>
<div class="show_wrapper">
  <div id="show">
    <img v-bind:src="imagePath" alt="no image exists">
    <div>genre :{{ item.imagePath }}</div>
    <div>title :{{ item.title }}</div>
    <div>text :{{ item.text }}</div>
    <div>
      liked:{{ item.liked }}
      <button v-on:click="like()">♡</button>
    </div>
    <ranking />
    <router-link :to="{ name: 'Home' }"> back </router-link>
  </div>
</div>
</template>


<script>
import Ranking from "../views/Ranking.vue"
import firebase from "firebase"


export default {
  data:function(){
    return{
      item:[],
      likePushed:false,
      imagePath:"",
      zoom:13
    }
  },
  methods:{
    like:function(){
      if(this.likePushed){
        this.item.liked -= 1
        this.likePushed = !this.likePushed
      }else{
        this.item.liked += 1
        this.likePushed = !this.likePushed
      }
    },
  },
  getItem: async function(){
    let self =this
    
    await firebase
    .firestore()
    .collection("tweets")
    .doc(this.postid)
    .get()
      .then(doc => {
        self.item = {
          ...doc.data()       
        }
        this.getImages(doc.data().imagePath)
      })    
  },
  getImages: async function(path){
    let self =this

    await firebase
      .storage()
      .ref()
      .child(path)
      .getDownloadURL()
      .then(function(url) {
        self.imagePath = url;
        console.log(url);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  props: { postid: String },
  components: { 
    Ranking
     },
  mounted: async function(){
    const storage = firebase.storage();
    const pathReference = storage.ref();
    let self = this;
    console.log(pathReference)

     firebase
      .firestore()
      .collection("tweets")
      .doc(this.postid)
      .get()
      .then(doc => {
        this.item = {
          id: doc.id,
          ...doc.data()       
        }
    pathReference.child(this.item.imagePath)
    .getDownloadURL()
    .then(function(url){
          self.imagePath = url;
          console.log(url);})
    .catch(function(error) {
      console.log(error)

});
      });
    
  }
}
</script>

<style>
.show_wrapper{
  box-shadow :0px 0px 3px silver;
  border: solid 1px whitesmoke;
  padding: 0.5em 1em 0.5em 2.3em;
  position: relative;
  background: #fafafa;
}
</style>