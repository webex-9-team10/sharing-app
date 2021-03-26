<template>
<div class="show_wrapper">
  <div id="show">
    <div>photo :{{ item.photo }}</div>
    <div>genre :{{ item.genre }}</div>
    <div>title :{{ item.title }}</div>
    <div>text :{{ item.text }}</div>
    <div>position :{{ item.position }}</div>
    <div>
      liked:{{ item.liked }}
      <button v-on:click="like()">♡</button>
    </div>
    <post-display />
    <ranking />
    <router-link :to="{ name: 'Home' }"> back </router-link>
  </div>
</div>
</template>


<script>
import PostDisplay from "../components/PostDisplay.vue"
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
      if(this.likePushed){
        this.item.liked -= 1
        this.likePushed = !this.likePushed
      }else{
        this.item.liked += 1
        this.likePushed = !this.likePushed
      }
    },
  },
  props: { postid: String },
  components: { 
    PostDisplay
     },
  mounted:function(){
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
      })
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