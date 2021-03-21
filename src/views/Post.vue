<template>
  <div class="home__wrapper">
    <submit-form v-bind:position="position"/>
    {{ lat }}
  </div>
</template>

<script>
import SubmitForm from "../components/SubmitForm.vue"

export default {
  data:function(){
    return{
      position:{
        lat:111,
        lng:11111
      }
    }
  },
  components: { SubmitForm },
  props:{
    lat:Number,
    lng:Number
  },
}
</script>

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>
