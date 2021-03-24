<template>
  <div>
    <button v-on:click="signout">sign out</button>
  <div class="Googlemap">
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
      <!-- クリックでマーカー表示 -->
      <div v-for="marker in markers" :key="marker.id">
        <GmapMarker
          :position="{ lat: marker.positionData.lat, lng: marker.positionData.lng }"
          :clickable="true"
          :draggable="false"
          v-on:click="showInfowindow(marker.id)"
        >
          <!-- マーカー上のウィンドウ表示 -->
          <gmap-info-window v-if="marker.infowWindow">
            <div @click="clickPin(marker.id)">{{ marker.title }}</div>
          </gmap-info-window>
        </GmapMarker>
      </div>
      ></GmapMap
    >
  </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      markers: [],
      zoom: 10,
    };
  },
  // ページ開いたとき
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
    // Fifebaseからデータを取得
    firebase
      .firestore()
      .collection("tweets")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
            this.markers.push({
            id: this.markers.length,
            postid: doc.id,
            ...doc.data()
          });
      });
    });
  },
  mounted() {
    //add the map to a data object
    this.$refs.mapRef.$mapPromise.then((map) => (this.map = map));
  },
  methods: {
    signout: function(){
      firebase.auth().signOut().then(() => {
        alert("ログアウトしました")
      }).catch((error) => {
        console.log(error)
      });
    },
    handleDrag() {
      let center = {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng(),
      };
      let zoom = this.map.getZoom();

      localStorage.center = JSON.stringify(center);
      localStorage.zoom = zoom;
    },
    //クリックしたらマーカー表示されるように
    getPosition: function(event) {
      if (event) {
        this.markers.push({
          id: this.markers.length,
          title: "新規登録",
          infowWindow: true,
          positionData: { lat: event.latLng.lat(), lng: event.latLng.lng() },
        });
      }
    },
    clickPin: function(id) {
      if (this.markers[id].title === "新規登録") {
        this.$router.push(
          { 
            name: `Post`, 
            params: {
              lat: this.markers[id].positionData.lat.toFixed(4),
              lng: this.markers[id].positionData.lng.toFixed(4)
            } 
          }
        );
      } else {
        this.$router.push(
          { name: `Show`, 
            params: {
              postid: this.markers[id].postid,
            } 
          }
        );
      }
    },
    showInfowindow: function(id) {      
      this.markers[id].infowWindow = !this.markers[id].infowWindow;
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

<style scoped>
.Googlemap {
  width: 100%;
}
</style>
