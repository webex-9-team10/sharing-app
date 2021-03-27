<template>
  <div class="show_wrapper">
    <div v-for="genre in genre_array" v-bind:key="genre.id">
      <h1>{{ genre.text }}</h1>
      <div v-for="item in array" :key="item.id">
        <div v-if="item.genre === genre.text">
          <div v-on:click="ClickPage(item.id)">
            {{ item.title }} : {{ item.liked }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: function() {
    return {
      array: [],
      genre_array: [
        { id: 0, text: "food" },
        { id: 1, text: "date" },
        { id: 2, text: "cafe" },
        { id: 3, text: "chill" },
        { id: 4, text: "museum" },
      ],
      //  food_array:[],
      //  museum_array:[],
      //  date_array:[],
      //  chill_array:[],
      //  cafe_array:[]
    };
  },
  methods: {
    ClickPage: function(id) {
      console.log(id);
      this.$router.push({
        name: `Show`,
        params: {
          postid: this.array[id].postid,
        },
      });
    },
  },
  mounted: function() {
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.array.push({
            id: this.array.length,
            postid: doc.id,
            ...doc.data(),
          });
          this.array.sort(function(a, b) {
            if (a.liked < b.liked) {
              return 1;
            } else {
              return -1;
            }
          });
        });
      });
  },
};
</script>

<style>
.show_wrapper {
  box-shadow: 0px 0px 3px silver;
  border: solid 1px whitesmoke;
  padding: 0.5em 1em 0.5em 2.3em;
  position: relative;
  background-color: #fff;
  font-family: "Open Sans", sans-serif;
  height: 200vh;
}
</style>
