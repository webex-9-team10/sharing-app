<template>
  <div id="show">
    <post-display />
    <router-link :to="{ name: 'index-page' }"> back </router-link>
    <div>
      投稿の内容を表示するページです！ 投稿のIDは {{ $route.params.postid }} 
    </div>
    <div>
      {{ postid }}
    </div>
  </div>
</template>


<script>
import PostDisplay from "../components/PostDisplay.vue"

export default {
  data:function(){
    return{
      post:{}
    }
  },
  props: { postid: String },
  components: { PostDisplay },
}
</script>

<style></style>