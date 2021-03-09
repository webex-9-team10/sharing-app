<template>
  <div>
    <h1>現在地</h1>
    <p>{{ coordinates.lat }} Latitude,{{ coordinates.lng }} Longitude</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };
  },
  created() {
    //get user's coordinates from browsers
    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates;
      })
      .catch((error) => alert(error));
  },
};
</script>

<style></style>
