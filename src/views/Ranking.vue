<template>
<div class="show_wrapper">
  <div id="food">
    <h1>food</h1>
    <div v-for="item in array" :key="item.id">
      <div v-if="item.genre === `food`">
        {{ item.title }} : {{ item.liked }}
      </div>
    </div>
  </div>
  <div id="date">
    <h1>date</h1>
    <div v-for="item in array" :key="item.id">
      <div v-if="item.genre === `date`">
        {{ item.title }} : {{ item.liked }}
      </div>
    </div>
  </div>
  <div id="cafe">
    <h1>cafe</h1>
    <div v-for="item in array" :key="item.id">
      <div v-if="item.genre === `cafe`">
        {{ item.title }} : {{ item.liked }}
      </div>
    </div>
  </div>
  <div id="chill">
    <h1>chill</h1>
    <div v-for="item in array" :key="item.id">
      <div v-if="item.genre === `chill`">
        {{ item.title }} : {{ item.liked }}
      </div>
    </div>
  </div>
  <div id="museum">
    <h1>museum</h1>
    <div v-for="item in array" :key="item.id">
      <div v-if="item.genre === `museum`">
        {{ item.title }} : {{ item.liked }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "firebase"

export default {
  data:function(){
    return{
     array:[],
     food_array:[],
     museum_array:[],
     date_array:[],
     chill_array:[],
     cafe_array:[]
    }
  },
  mounted:function(){
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
            this.array.push({
            id: this.array.length,
            postid: doc.id,
            ...doc.data()
          })
          this.array.sort(function(a, b) {
            if (a.liked < b.liked) {
              return 1;
            } else {
              return -1;
            }
          })
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