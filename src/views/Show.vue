<template>
<div class="show_wrapper">
  <div id="show">
    <div>photo :{{ item.photo }}</div>
    <div>genre :{{ item.genre }}</div>
    <div>title :{{ item.title }}</div>
    <div>text :{{ item.text }}</div>
    <div>
      liked :{{ item.liked }}    
      <button v-on:click="like()">いいね</button>
    </div>
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
      likePushed:false
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
  },
  props: { postid: String },
  mounted:function(){
    firebase
      .firestore()
      .collection("tweets")
      .doc(this.postid)
      .get()
      .then(doc => {
        this.item = {
          ...doc.data()       
        }
      })
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