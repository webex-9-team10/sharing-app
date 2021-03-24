<template>
<div class="show_wrapper">
  <div id="show">
    <img :src="imagePath" alt="no image exists">
    <div>genre :{{ item.genre }}</div>
    <div>title :{{ item.title }}</div>
    <div>text :{{ item.text }}</div>
    <div>
      liked :{{ item.liked }}    
      <button v-on:click="like()">いいね</button>
    </div>
     <!-- Google Mapの実装 -->
    <GmapMap
      :center="{ lat: item.positionData.lat, lng: item.positionData.lng }"
      :zoom="zoom"
      style="width:640px;height:360px; margin:32px auto;"
      ref="mapRef"
    >
      <!-- クリックでマーカー表示 -->
        <GmapMarker
          :position="{ lat: item.positionData.lat, lng: item.positionData.lng }"
          :clickable="false"
          :draggable="false"
        ></GmapMarker>
    </GmapMap>
    <router-link :to="{ name: 'Home' }"> back </router-link>
  </div>
</div>
</template>

<script>
import firebase from "firebase"

export default {
  data:function(){
    return{
      item:{},
      likePushed:false,
      imagePath:"",
      zoom:13
    }
  },
  methods:{
    like:function(){      
      if (this.likePushed) {
        this.item.liked -= 1
        this.likePushed = !this.likePushed
      }else{
        this.item.liked += 1
        this.likePushed = !this.likePushed
      }
    },
    getItem: async function(){
      let self = this

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
      let self = this

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
    }
  },
  props: { postid: String },
  mounted:function(){
    this.getItem()    
  },
  destroyed:function(){
    firebase
      .firestore()
      .collection("tweets")
      .doc(this.postid)
      .set(this.item)
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