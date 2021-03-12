<template>
  <div id="show">
    <div>photo :{{ item.photo }}</div>
    <div>genre :{{ item.genre }}</div>
    <div>title :{{ item.title }}</div>
    <div>text :{{ item.text }}</div>
    <div>position :{{ item.position }}</div>
    <post-display />
    <router-link :to="{ name: 'Home' }"> back </router-link>
  </div>
</template>


<script>
import PostDisplay from "../components/PostDisplay.vue"
import firebase from "firebase"

export default {
  data:function(){
    return{
      item:{}
    }
  },
  props: { postid: String },
  components: { PostDisplay },
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

<style></style>