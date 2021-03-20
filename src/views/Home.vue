<template>
  <div>
    <button v-on:click="signout">sign out</button>
    <!-- 座標の表示  -->
    <div
      style=" flex-direction:row; align-items:center; justify-content:space-between"
    >
      <div>
        <!-- 現在地の座標表示 -->
        <h1>現在地:</h1>
        <p>
          {{ myCoordinates.lat }} Latitude,{{ myCoordinates.lng }} Longitude
        </p>
        <div>
          <!-- マップ上の座標表示 -->
          <h1>Map coordinates:</h1>
          <p>
            {{ mapCoordinates.lat }} Latitude,{{ mapCoordinates.lng }} Longitude
          </p>
        </div>
      </div>
    </div>
    <!-- Google Mapの実装 -->
    <GmapMap
      :center="myCoordinates"
      :zoom="zoom"
      style="width:640px;height:360px; margin:32px auto;"
      ref="mapRef"
      @dragend="handleDrag()"
      @click="getPosition($event)"
    >
      <div v-for="marker in markers" :key="marker.id">
        <GmapMarker
          :position="{ lat: marker.position.lat, lng: marker.position.lng }"
          :clickable="true"
          :draggable="false"
        ></GmapMarker>
      </div>
      ></GmapMap
    >
  </div>
</template>

<script>
import firebase from "../firebase.js";

export default {
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      markers: [
        {
          id: 0,
          position: { lat: 35.649, lng: 139.7433 },
        },
        {
          id: 1,
          position: { lat: 35.6577, lng: 139.702 },
        },
        {
          id: 2,
          position: { lat: 35.6589, lng: 139.7459 },
        },
      ],
      zoom: 10,
    };
  },
  created() {
    //does the user have a saved center?use it instead of the default
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      //get user's coordinates from browsers
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    //does the user have a saved center?use it instead of the default
    if (localStorage.zoom) {
      this.zoom = parseInt(localStorage.zoom);
    }
  },
  mounted() {
    //add the map to a data object
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    handleDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
    getPosition: function(event) {
      console.log(event.latLng.lat());
      if (event) {
        this.markers.push({
          id: this.markers.length,
          position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
      }
    },
    signout: function(){
      firebase.auth().signOut().then(() => {
        alert("ログアウトしました")
        this.router.push("/");
      }).catch((error) => {
        console.log(error)
      });
    },
  },
  computed: {
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }
      return {
        lat: this.map
          .getCenter()
          .lat()
          .toFixed(4),
        lng: this.map
          .getCenter()
          .lng()
          .toFixed(4),
      };
    },
  },
};
</script>
